import React from 'react';
import { Java } from '../../components/code/Java';
import { useTitle } from '../../common';

const title = 'How to parse large JSON file';

const objectCode = `
@ToString
class User {
    private final int id;
    private final String name;
    
    @JsonCreator
    User(@JsonProperty("id") int id, 
         @JsonProperty("name") String name) {
        this.id = id;
        this.name = name;
    }
}
`.trim();

const parserCode = `
class Parser {
    
    public void test() {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonFactory jsonFactory = objectMapper.getFactory();
        ObjectReader objectReader = objectMapper.readerFor(User.class);
        
        try (JsonParser jsonParser = jsonFactory.createParser(inputStream())) {
        
            if (jsonParser.nextToken() != JsonToken.START_ARRAY) {
                throw new IllegalStateException("Expected content to be an array");
            }
        
            while (jsonParser.nextToken() != JsonToken.END_ARRAY) {
                User user = objectReader.readValue(jsonParser);
                // do some processing with "user"
            }
        }
    }
}

`.trim();

const reactiveUtilsCode = `
class ReactiveUtils {
    
    static <T> Flux<T> readValues(JsonParser jsonParser, Class<T> clazz) {
        if (jsonParser == null) return Flux.error(new NullPointerException("jsonParser"));
        if (clazz == null)      return Flux.error(new NullPointerException("clazz"));
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
                
            } catch (IOException e) {
                fluxSink.error(e);
            }
        });
    }
}
`.trim();

const readValuesCode = `

class ReactiveParser {

    static void test() {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonFactory jsonFactory = objectMapper.getFactory();
    
        Mono.fromCallable(() -> jsonFactory.createParser(inputStream()))
                .flatMapMany(jsonParser -> {
                    // reads all values and closes "jsonParser"
                    return ReactiveUtils.readValues(jsonParser, User.class)
                            .doFinally(signalType -> jsonParser.close());
                })
                .flatMap(user -> {
                    // do some async processing with user
                    return Flux.just(user);
                })
                .doOnError(e -> {
                    // handle error
                })
                .subscribe();
    }
}
`.trim();

export const JacksonStream = () => {
  useTitle(title);
  return (
    <>
      <h1>{title}</h1>
      <p>
        How to parse large JSON file by using FasterXML Jackson Streaming and ObjectMapper combination
      </p>

      <h2>Object</h2>
      <Java>{objectCode}</Java>

      <h2>Parser</h2>
      <Java>{parserCode}</Java>

      <h2>Reactive Solution (Project Reactor)</h2>
      <h3>Reactive Parser</h3>
      <Java>{readValuesCode}</Java>
      <h3>Reactive Utils</h3>
      <Java>{reactiveUtilsCode}</Java>
    </>
  );
};

JacksonStream.propTypes = {};
