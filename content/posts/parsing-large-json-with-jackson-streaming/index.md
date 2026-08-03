---
title: "How to parse large JSON file"
date: 2021-03-01
draft: true
tags: ["java", "jackson", "reactive"]
---

How to parse a large JSON file by using FasterXML Jackson Streaming and
`ObjectMapper` combination.

## Links

- [Github: FasterXML/jackson](https://github.com/FasterXML/jackson)
- [Github: reactor/reactor-core](https://github.com/reactor/reactor-core)

## Data Objects

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
                // do some processing with "user"
            }
        }
    }

    static java.io.InputStream ioSource() {
        // return io source
    }
}
```

## Reactive Solution (Project Reactor)

`ReactiveParser.java`:

```java
class ReactiveParser {

    static void test() {

        ObjectMapper objectMapper = new ObjectMapper();
        // configure objectMapper ...

        JsonFactory jsonFactory = objectMapper.getFactory();

        Mono.fromCallable(() -> jsonFactory.createParser(ioSource()))
                .flatMapMany(jsonParser -> {
                    // reads all values and closes "jsonParser"
                    return ReactiveUtils.readArrayValues(jsonParser, User.class)
                            .doFinally(ReactiveUtils.closeFn(jsonParser));
                })
                .flatMap(user -> {
                    // do some async processing with user
                    // for instance, let's use Lettuce Redis API
                    return lettuceRedisConnection.reactive()
                            .hset("users", user.getId(), user);
                })
                .doOnError(e -> {
                    // handle error
                })
                .subscribe();
    }

    static java.io.InputStream ioSource() {
        // return io source
    }
}
```

`ReactiveUtils.java`:

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
                // handle close exception or just ignore it ;)
            }
        };
    }
}
```
