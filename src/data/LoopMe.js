export const exp = () => {
    return {
        id: 'exp_loopme',
        name: "Software Engineer at LoopMe",
        city: "Dnipro, Ukraine",
        dates: {
            start: new Date(2014, 7 - 1, 1),
            end: new Date(2018, 10 - 1, 30)
        },
        description: `
            For a better understanding of what I did and what I do now,
            I’ll split to 4 positions (periods of time):
            `,
        responsibility: null,
        achievements: null,
        currentState: null,
        inner: [
            {
                name: "Clojure Developer in Ad Server Team",
                city: "Dnipro, Ukraine",
                dates: {
                    start: new Date(2014, 7 - 1, 1),
                    end: new Date(2015, 2 - 1, 1)
                },
                description: "",
                responsibility: `
                    Migrate from Ruby to Clojure, new features, develop fast solution for ad targeting
                    (choosing best ad from big list of ads)
                    `,
                techStack: {
                    language: "Clojure (based on Java 8)",
                    frameworks: "many Clojure specific libraries",
                    prod_env: "custom",
                    build_tool: "Leiningen",
                    ci_cd: "Travis CI",
                    storage: "PostgreSQL, Redis, Elasticsearch",
                    vcs: "Git (Github)",
                    metrics: "PostgreSQL, Elasticsearch"
                }
            },
            {
                name: "Clojure/Java Developer in Ad Server Team ",
                city: "Dnipro, Ukraine",
                dates: {
                    start: new Date(2015, 2 - 1, 1),
                    end: new Date(2015, 6 - 1, 1)
                },
                achievements: `
                    I had to implement a very difficult task between 2 languages. 
                    It had to be easy if another team helped. But the idea was on PoC stage. 
                    I had to do it by myself. I did it successfully and I got "Company Hero" award and £100. 
                    This award is given once every six months.
                    `,
                description: null,
                currentState: "Migrated from Clojure to Java fully",
                responsibility: `
                    Develop high-load ad-server, ad targeting, api’s for real time bidding platforms,
                    migration from Clojure to Java.
                    `,
                techStack: {
                    language: "Java 8, Clojure (based on Java 8)",
                    frameworks: "Spring Boot, Spring 4",
                    prod_env: "Mesosphere (Mesos + Marathon)",
                    build_tool: "Leiningen (for Clojure Projects), Maven 3 (for Java Projects)",
                    ci_cd: "Travis CI, Jenkins",
                    storage: "PostgreSQL, Redis, Elasticsearch",
                    vcs: "Git (Github)",
                    metrics: "Datadog → Grafana + InfluxDB"
                }
            },
            {
                name: "Clojure/Java Developer in Ad Server Team ",
                city: "Dnipro, Ukraine",
                dates: {
                    start: new Date(2015, 6 - 1, 1),
                    end: new Date(2016, 9 - 1, 1)
                },
                description: null,
                responsibility: `
                    Develop high-load ad-server, ad targeting, api’s for real time bidding platforms,
                    api’s for front-end team.
                    `,
                techStack: {
                    language: "Java 8",
                    frameworks: "Spring Boot, Spring 4, RxJava, gRPC (netty + protobuf)",
                    prod_env: "Docker, Kubernetes",
                    build_tool: "Gradle 4.8",
                    ci_cd: "Jenkins",
                    storage: "Kafka, Cassandra, PostgreSQL, Elasticsearch",
                    vcs: "Git (Github)",
                    metrics: "Grafana → Datadog"
                }
            },
            {
                name: "Java Developer in Data Science Team",
                city: "Dnipro, Ukraine",
                dates: {
                    start: new Date(2016, 9 - 1, 1),
                    end: new Date(2018, 11 - 1, 1)
                },
                achievements: `
                    I’ve been working for Data Science team for about 2 years.
                    As a result, I created high-performance java applications by using
                    a small number of design patterns and different data structures
                    with response ~1ms (99 percentile). I didn't use a lot of frameworks
                    and libraries, and it helped with future migrations on new java versions.
                    `,
                responsibility: `
                    Develop high-performance high-load applications
                    for Data Science team, implement data science algorithms and adopt it for runtime,
                    deliver prediction and bidding models to production,
                    implement custom transport solutions for big prediction models,
                    benchmarking, data structures investigation.
                    `,
                techStack: {
                    language: "Java 8, 9, 10, 11 (currently preparing migration to 12ea)",
                    frameworks: "Mostly Just Java, Spring Boot 2, Spring 5, RxJava 2, gRPC (netty + protobuf)",
                    prod_env: "Docker, Kubernetes",
                    build_tool: "Gradle 4.8.1, 4.10.2",
                    ci_cd: "Jenkins (pipelines + Docker Multi-Stage builds)",
                    storage: "Kafka, Cassandra, PostgreSQL, Elasticsearch 6",
                    vcs: "Git (Github)",
                    metrics: "Datadog → Prometheus + Grafana"
                }
            }
        ]
    }
}