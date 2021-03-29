import React from 'react';
import { useTitle } from '../../common';
import { Tab, Tabs } from 'react-bootstrap';
import { Java, Json } from '../../components/code';
import { BlankLink } from '../../components/common/BlankLink';

const title = 'How to parse large JSON file';

const userClass = `
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
`.trim();

const phoneClass = `
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
`.trim();

const jsonExample = `
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
`.trim();

const simpleParserCode = `
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

`.trim();

const reactiveUtilsCode = `
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
`.trim();

const reactiveParserCode = `
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
`.trim();

export function JacksonStream() {
  useTitle(title);
  return (
    <>
      <h1>{title}</h1>

      <h2>Description</h2>
      <section>
        <p>
          How to parse large JSON file by using FasterXML Jackson Streaming and ObjectMapper combination
        </p>
      </section>

      <h2>Links</h2>
      <section>
        <ul>
          <li>
            <BlankLink href={'https://github.com/FasterXML/jackson'} name={'Github: FasterXML/jackson'}/>
          </li>
          <li>
            <BlankLink href={'https://github.com/reactor/reactor-core'}>
              Github: reactor/reactor-core
            </BlankLink>
          </li>
        </ul>
      </section>

      <h2>Data Objects</h2>
      <Tabs defaultActiveKey={'user'}>
        <Tab eventKey={'user'} title={'User.java'}>
          <Java>{userClass}</Java>
        </Tab>
        <Tab eventKey={'phone'} title={'Phone.java'}>
          <Java>{phoneClass}</Java>
        </Tab>
        <Tab eventKey={'json'} title={'Json Example'}>
          <Json>{jsonExample}</Json>
        </Tab>
      </Tabs>

      <h2>Simple Parser</h2>
      <Java>{simpleParserCode}</Java>

      <h2>Reactive Solution (Project Reactor)</h2>

      <Tabs defaultActiveKey={'parser'}>
        <Tab eventKey={'parser'} title={'ReactiveParser.java'}>
          <Java>{reactiveParserCode}</Java>
        </Tab>
        <Tab eventKey={'utils'} title={'ReactiveUtils.java'}>
          <Java>{reactiveUtilsCode}</Java>
        </Tab>
      </Tabs>
    </>
  );
}

JacksonStream.propTypes = {};
