import moment from "moment";

export default {

    about: "",

    contacts: [
        {name: "Email", link: "mailto:gd.mail.89@gmail.com"},
        {name: "Skype", link: "skype:dier_89"},
        {name: "Github", link: "https://github.com/DimkaGorhover"},
        {name: "Telegram", link: "https://t.me/hdmytro"},
        {name: "Twitter", link: "https://twitter.com/dghover"},
        {name: "Facebook", link: "https://www.facebook.com/dmitriy.gorhover"}
    ],

    experience: [
        {
            name: "Software Engineer ar N-IX",
            city: "Lviv, Ukraine",
            dates: {
                start: moment([2019, 8, 1])
            },
            description: "",
            responsibility: "",
            tech_stack: {
                language: "Java 6, Java 8",
                frameworks: "-",
                prod_env: "custom manual scripting",
                build_tool: "Maven 3.3.1",
                ci_cd: "Jenkins",
                storage: "-",
                vcs: "Subversion",
                metrics: "-"
            }
        },
        {
            name: "Senior Java Developer ar Intellias",
            city: "Lviv, Ukraine",
            dates: {
                start: moment([2018, 11, 1]),
                end: moment([2019, 3, 15])
            },
            description: "",
            responsibility: "Implementing new Map Matcher algorithm based on Hidden Markov Model + Algorithm Viterbi",
            tech_stack: {
                language: "Java 8",
                frameworks: "-",
                prod_env: "unknown",
                build_tool: "Maven",
                ci_cd: "Jenkins (all custom scripts on bash)",
                storage: "AWS (Hadoop, EMR)",
                vcs: "Git (Gerrit)",
                metrics: "-"
            }
        },
        {
            name: "Software Engineer at LoopMe",
            city: "Dnipro, Ukraine",
            dates: {
                start: moment([2014, 7, 1]),
                end: moment([2018, 10, 30])
            },
            description: "For a better understanding of what I did and what I do now, I’ll split to 4 positions (periods of time):",
            responsibility: null,
            achievements: null,
            current_state: null,
            inner: [
                {
                    name: "Clojure Developer in Ad Server Team",
                    city: "Dnipro, Ukraine",
                    dates: {
                        start: moment([2014, 7, 1]),
                        end: moment([2015, 2, 1])
                    },
                    description: "",
                    responsibility: "Migrate from Ruby to Clojure, new features, develop fast solution for targeting (choosing best ad from big list of ads)",
                    tech_stack: {
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
                        start: moment([2015, 2, 1]),
                        end: moment([2015, 6, 1])
                    },
                    achievements: "I had to implement very difficult task between 2 languages. It had to be easy if another team helped. But idea was on “proof of concept” stage. I had to do it by myself. I did it and I got \"Company Hero\" award and £100 =) . This award is given once every six months.",
                    description: null,
                    current_state: "Migrated from Clojure to Java fully",
                    responsibility: "Develop high-load ad-server, ad targeting, api’s for real time bidding platforms, migration from Clojure to Java.",
                    tech_stack: {
                        language: "Java 8, Clojure (based of Java 8)",
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
                        start: moment([2015, 6, 1]),
                        end: moment([2015, 9, 1])
                    },
                    description: null,
                    responsibility: "Develop high-load ad-server, ad targeting, api’s for real time bidding platforms, api’s for front-end team.",
                    tech_stack: {
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
                        start: moment([2015, 9, 1]),
                        end: moment([2018, 11, 1])
                    },
                    achievements: "I’ve been working for Data Science team alone about 2 years. As a result i created high performance java application by using small amount of design patterns and different data structures with response ~1ms (99 percentile). I didn't use lot of frameworks and libraries, and it helped with future migrations on new java versions.",
                    responsibility: "Develop high-performance high-load applications for Data Science Team, implement data science algorithms and adopt it for runtime, deliver prediction and bidding models to production, implement custom transport solutions for big prediction model, benchmarking, data structures investigation.",
                    tech_stack: {
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
        },
        {
            name: "Software Engineer at Ciklum",
            description: "I’ve been working on LoopMe project when it was Ciklums outstaff project. More details in \"Software Engineer at LoopMe\".",
            dates: {
                start: moment([2014, 7, 1]),
                end: moment([2015, 11, 1])
            }
        },
        {
            name: "Software/Java Engineer / Tech Lead at PrivatBank",
            dates: {
                start: moment([2013, 7, 1]),
                end: moment([2014, 7, 30])
            },
            description: "I’ve been involved to develop such project like:"
        },
        {
            name: "Software/Java Engineer at PrivatBank",
            responsibility: "Small features (clinet messages counters, form \"don't block credit card abroad\", etc.), support, bugfix, unit testing, etc.",
            dates: {
                start: moment([2012, 2, 28]),
                end: moment([2013, 7, 1])
            },
            tech_stack: {
                language: "",
                frameworks: "",
                prod_env: "",
                build_tool: "",
                ci_cd: "",
                storage: "",
                vcs: "",
                metrics: ""
            },
            inner: [
                {
                    name: "Privat24 Ukraine",
                    dates: {
                        start: moment([2012, 2, 28]),
                        end: moment([2013, 7, 1])
                    },
                    responsibility: "Small features (clinet messages counters, form \"don't block credit card abroad\", etc.), support, bugfix, unit testing, etc.",
                    description: "",
                    tech_stack: {
                        language: "Java 6, JavaScript",
                        frameworks: "Java EE (EJB), jQuery, Backbone",
                        prod_env: "",
                        build_tool: "Apache Ant",
                        ci_cd: "Jenkins",
                        storage: "Sybase, Redis, RabbitMQ",
                        vcs: "Subversion",
                        metrics: ""
                    },
                },
                {
                    name: "Privat24 Georgia",
                    dates: {
                        start: moment([2012, 2, 28]),
                        end: moment([2013, 7, 1])
                    },
                    current_state: "acquired by Bank of Georgia",
                    achievements: "The project was written via Netbeans New Project which based on custom Netbeans Ant scripts plus Java EE (EJB). It was impossible to move such project to, for example, new version of java, etc. I spend 4 weekends (days + nights) and migrated this project to Java 7 + Spring + Maven + Git. No mentors helped me. It was great experience for me that I remember in nowadays.",
                    responsibility: "Develop and support internet banking web application, same as Privat24 Ukraine",
                    description: "",
                    tech_stack: {
                        language: "Java 6, JavaScript --> Java 7, JavaScript",
                        frameworks: "Java EE (EJB), jQuery --> Spring 3, jQuery",
                        prod_env: "custom",
                        build_tool: "Netbeans’ Ant scripts --> Apache Maven",
                        ci_cd: "Jenkins",
                        storage: "Sybase, Redis, RabbitMQ",
                        vcs: "Subversion --> Git (Gitlab)",
                        metrics: ""
                    },
                },
                {
                    name: "Privat24 A-Bank",
                    dates: {
                        start: moment([2012, 2, 28]),
                        end: moment([2013, 7, 1])
                    },
                    responsibility: "Develop and support internet banking web application, same as Privat24 Ukraine",
                    description: "",
                    tech_stack: {
                        language: "Java 6, JavaScript",
                        frameworks: "Java EE (EJB), jQuery",
                        prod_env: "custom",
                        build_tool: "Netbeans’ Ant scripts",
                        ci_cd: "Jenkins",
                        storage: "Sybase, Redis, RabbitMQ",
                        vcs: "Subversion",
                        metrics: ""
                    },
                }
            ]
        }
    ]
};
