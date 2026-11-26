---
title: "Parsing a multi-gigabyte JSON array in Java with Jackson streaming"
date: 2021-03-01
lastmod: 2026-11-26
draft: false
description: >-
  Parse JSON files too large to fit in memory by combining Jackson's streaming
  JsonParser with ObjectReader data binding, one array element at a time, plus
  a reactive variant that exposes the stream as a backpressure-aware Reactor
  Flux.
tags: ["java", "jackson", "reactive"]
---

**TL;DR:** `objectMapper.readValue()` on a multi-gigabyte JSON array loads the
whole file and runs out of memory. Walking the array with Jackson's
`JsonParser` and binding one element at a time with an `ObjectReader` keeps
memory at the size of a single record.

## Background

I worked as a full-stack engineer in a team of about ten, building e-commerce
services for a large US retailer. The backend was reactive Java: Spring
WebFlux and Project Reactor, deployed to Kubernetes.

## Issue

Some of those services imported large JSON files, each one a big array of
records. The import code read the whole file with `objectMapper.readValue()`,
so **memory grew with the file, into gigabytes**, and the bigger imports ended
in `OutOfMemoryError`. A bigger heap would only have moved the limit to the
next bigger file.

The import never needed the whole array at once, just one element at a time.
Jackson's streaming API (`JsonParser`) reads token by token in constant
memory, but working with raw tokens by hand is tedious. The fix combines both
layers: `JsonParser` walks the array, and an `ObjectReader` binds each element
with regular data binding.

## Data objects

Plain value classes with `@JsonCreator` constructors. Nothing here is
streaming-specific; they bind the same way as with a regular `readValue()`.

```java
@ToString
class User {
    private final int id;
    private final String name;
    private final List<Phone> phones;

    @JsonCreator
    User(@JsonProperty("id") int id,
         @JsonProperty("name") String name,
         @JsonProperty("phones") List<Phone> phones) {
        this.id = id;
        this.name = name;
        this.phones = phones;
    }
}

@ToString
class Phone {
    private final String phone;
    private final String type;

    @JsonCreator
    Phone(@JsonProperty("phone") String phone,
          @JsonProperty("type") String type) {
        this.phone = phone;
        this.type = type;
    }
}
```

The input is one top-level array, a few gigabytes of elements like these:

```json
[
  {"id": 41, "name": "name_for_41", "phones": [{"phone": "+123456789000", "type": "work"}]},
  {"id": 42, "name": "name_for_42", "phones": []}
]
```

## Streaming parser

The parser checks for the opening `[`, then loops. Each `nextToken()` moves
to the start of the next element, and `objectReader.readValue(jsonParser)`
binds **just that element**, leaving the parser on its closing `}`.

```java
class Parser {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final ObjectReader USER_READER = MAPPER.readerFor(User.class);

    void parse(InputStream in) throws IOException {
        try (JsonParser jsonParser = MAPPER.getFactory().createParser(in)) {
            if (jsonParser.nextToken() != JsonToken.START_ARRAY) {
                throw new IllegalStateException("Expected content to be an array");
            }
            while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
                User user = USER_READER.readValue(jsonParser);
                // process "user" here; it is the only element in memory
            }
        }
    }
}
```

A truncated file doesn't loop forever: `nextToken()` throws a
`JsonEOFException` when the input ends inside the array.

## Reactive variant

The loop is synchronous: parsing waits while each element is processed. In a
WebFlux service I wanted each `User` as an element of a `Flux`, so downstream
operators could process them asynchronously with bounded concurrency.

`Flux.generate` fits this exactly. It calls the generator **once per
requested element**, so the parser only reads as fast as downstream asks, and
its last argument closes the parser on complete, error and cancel.

```java
class ReactiveParser {

    static <T> Flux<T> readArrayValues(Callable<JsonParser> open, ObjectReader reader) {
        return Flux.generate(
                () -> {
                    JsonParser parser = open.call();
                    if (parser.nextToken() != JsonToken.START_ARRAY) {
                        parser.close();
                        throw new IllegalStateException("Expected content to be an array");
                    }
                    return parser;
                },
                (parser, sink) -> {
                    try {
                        if (parser.nextToken() == JsonToken.END_ARRAY) {
                            sink.complete();
                        } else {
                            sink.next(reader.<T>readValue(parser));
                        }
                    } catch (IOException e) {
                        sink.error(e);
                    }
                    return parser;
                },
                parser -> {
                    try {
                        parser.close();
                    } catch (IOException ignored) {
                        // the stream has already terminated
                    }
                });
    }
}
```

Using it, with at most 16 elements in flight:

```java
ObjectMapper mapper = new ObjectMapper();

ReactiveParser.<User>readArrayValues(
                () -> mapper.getFactory().createParser(openInput()),
                mapper.readerFor(User.class))
        .flatMap(user -> save(user), 16) // save returns a Mono
        .subscribe();
```

{{< alert >}}
The first version of this post used `Flux.create` with a `while` loop inside.
That pushes every element as fast as the parser can read, and the default
`OverflowStrategy.BUFFER` queues whatever downstream hasn't consumed yet.
Reactor's docs warn that it "does unbounded buffering and may lead to
`OutOfMemoryError`". With a slow sink, that brings back the exact problem the
streaming parser was meant to fix.
{{< /alert >}}

The snippets are Jackson 2 and Reactor 3. I rewrote them in 2026 from the
2021 post to fix the code and **have not re-run them**, so test them before
you rely on them.

## How to do it now

Jackson already has the loop built in. `ObjectReader.readValues()` returns a
`MappingIterator`, and when the input is a top-level array it iterates over
the elements:

```java
try (MappingIterator<User> users = USER_READER.readValues(in)) {
    while (users.hasNextValue()) {
        User user = users.nextValue();
        // process "user"
    }
}
```

This replaces the `START_ARRAY` and `END_ARRAY` handling. I'd use it for the
synchronous case today, and keep the hand-written `JsonParser` only when the
array sits deeper in the document.

Jackson 3 (Java 17+) moves everything to the `tools.jackson` package, makes
`ObjectMapper` immutable (`JsonMapper.builder()`), turns `JacksonException`
into an unchecked exception, and removes `JsonParser.getCodec()`. The
approach is the same; the `IOException` handling goes away. See the
[migration guide](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md).

## What it does not do

- Memory is bounded by **one element**, not by a fixed number. A single huge
  element still has to fit.
- It expects the array at the top level. For an array inside an object, move
  the parser to it first (for example by walking tokens to the field name).
- The import can't resume. If it fails halfway, it starts over from the
  beginning of the file.

## Conclusion

- Streaming plus data binding took the imports **from gigabytes of memory to
  a constant few megabytes** and ended the `OutOfMemoryError`s.
- `JsonParser` walks the array; `ObjectReader.readValue(parser)` binds one
  element at a time.
- `ObjectReader.readValues()` and `MappingIterator` do the same loop with no
  token handling.
- In Reactor, `Flux.generate` reads on demand and closes the parser for you.
  `Flux.create` with the default strategy buffers without limit.

## Links

- [Github: FasterXML/jackson](https://github.com/FasterXML/jackson)
- [Jackson 3 migration guide](https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md)
- [Reactor: programmatically creating a sequence](https://projectreactor.io/docs/core/release/reference/producing.html)
- [Github: reactor/reactor-core](https://github.com/reactor/reactor-core)
