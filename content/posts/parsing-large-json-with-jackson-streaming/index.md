---
title: "How to parse large JSON file"
date: 2021-03-01
draft: true
description: >-
  Parse JSON files too large to fit in memory by combining Jackson's streaming
  JsonParser with ObjectMapper data binding — plus a reactive variant that
  exposes the stream as a Project Reactor Flux for async processing.
tags: ["java", "jackson", "reactive"]
---

Calling `objectMapper.readValue()` on a multi-gigabyte JSON file loads the
whole document into memory and ends in an `OutOfMemoryError`. When the file is
a large array of records, you don't need the whole array at once — you need
one element at a time.

Jackson's streaming API (`JsonParser`) reads token by token with constant
memory, but working with raw tokens is tedious. The trick is to combine both
layers: let `JsonParser` walk the array and hand each element to an
`ObjectReader` for regular data binding. Memory usage stays bounded by the
size of a single element, not the whole file.

## Links

- [Github: FasterXML/jackson](https://github.com/FasterXML/jackson)
- [Github: reactor/reactor-core](https://github.com/reactor/reactor-core)

## Data Objects

Plain immutable value classes with `@JsonCreator` constructors — nothing
streaming-specific here, they deserialize the same way as with a regular
`ObjectMapper` call.

`User.java`:

```java
@ToString
class User {
    private final int id;
    private final String name;
    private final List<String> phones;

    @JsonCreator
    User(@JsonProperty("id") int id,
         @JsonProperty("name") String name,
         @JsonProperty("phones") List<String> phones) {
        this.id = id;
        this.name = name;
        this.phones = phones;
    }
}
```

`Phone.java`:

```java
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

JSON example:

```json
[
  // ...
  {
    "id": 42,
    "name": "name_for_42",
    "phones": [
      {
        "phone": "+123456789000",
        "type": "work"
      }
    ]
  },
  // ...
]
```

## Simple Parser

The parser advances to the opening `[`, then loops: each `nextToken()` call
positions the stream at the start of the next element, and
`objectReader.readValue(jsonParser)` binds just that element to a `User`.
Only one `User` is ever held in memory at a time.

```java
class Parser {

    void parse() {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonFactory jsonFactory = objectMapper.getFactory();
        ObjectReader objectReader = objectMapper.readerFor(User.class);

        try (JsonParser jsonParser = jsonFactory.createParser(ioSource())) {

            if (jsonParser.nextToken() != JsonToken.START_ARRAY) {
                throw new IllegalStateException("Expected content to be an array");
            }

            while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
                User user = objectReader.readValue(jsonParser);
                // process "user" here — it's the only element in memory
            }
        }
    }

    static java.io.InputStream ioSource() {
        // open the JSON input: FileInputStream, HTTP response body, etc.
    }
}
```

## Reactive Solution (Project Reactor)

The while-loop works, but processing is synchronous: parsing blocks until each
element is handled. Wrapping the same streaming logic in a `Flux` decouples
parsing from processing — each `User` is emitted as it's read, downstream
operators can process it asynchronously, and the parser is closed when the
stream terminates for any reason.

`ReactiveParser.java`:

```java
class ReactiveParser {

    static void test() {

        ObjectMapper objectMapper = new ObjectMapper();
        // register modules, enable/disable features, etc.

        JsonFactory jsonFactory = objectMapper.getFactory();

        Mono.fromCallable(() -> jsonFactory.createParser(ioSource()))
                .flatMapMany(jsonParser -> {
                    // emit each array element as a User;
                    // doFinally guarantees the parser is closed on
                    // complete, error, and cancel
                    return ReactiveUtils.readArrayValues(jsonParser, User.class)
                            .doFinally(ReactiveUtils.closeFn(jsonParser));
                })
                .flatMap(user -> {
                    // async processing per element — here: store the user
                    // in Redis via the reactive Lettuce API
                    return lettuceRedisConnection.reactive()
                            .hset("users", user.getId(), user);
                })
                .doOnError(e -> {
                    // parsing and processing errors both end up here
                })
                .subscribe();
    }

    static java.io.InputStream ioSource() {
        // open the JSON input: FileInputStream, HTTP response body, etc.
    }
}
```

`ReactiveUtils.java` — the same token loop as the simple parser, wrapped in
`Flux.create` so each element becomes an emission:

```java
class ReactiveUtils {

    static <T> Flux<T> readArrayValues(JsonParser jsonParser, Class<T> clazz) {
        if (jsonParser == null) {
            return Flux.error(new NullPointerException("jsonParser"));
        }
        if (clazz == null) {
            return Flux.error(new NullPointerException("clazz"));
        }
        return Flux.create(fluxSink -> {
            try {

                ObjectMapper objectMapper = (ObjectMapper) jsonParser.getCodec();
                ObjectReader objectReader = objectMapper.readerFor(clazz);

                if (jsonParser.nextToken() != JsonToken.START_ARRAY) {
                    fluxSink.error(new IllegalStateException("Expected content to be an array"));
                    return;
                }

                while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
                    T obj = objectReader.readValue(jsonParser);
                    fluxSink.next(obj);
                }

                fluxSink.complete();

            } catch (IOException e) {
                fluxSink.error(e);
            }
        });
    }

    static Consumer<SignalType> closeFn(AutoCloseable closeable) {
        if (closeable == null) {
            return ignore -> {};
        }
        return signalType -> {
            try {
                closeable.close();
            } catch (Exception e) {
                // stream already terminated at this point —
                // log the close failure or deliberately ignore it
            }
        };
    }
}
```
