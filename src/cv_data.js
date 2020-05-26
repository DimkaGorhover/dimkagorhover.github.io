export const info = {
    first_working_day: new Date(2012, 2, 28)
}

export const contacts = [
    { name: "Email", link: "mailto:gd.mail.89@gmail.com" },
    { name: "Skype", link: "skype:dier_89" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/dmitriy-gorkhover/" },
    { name: "Github", link: "https://github.com/DimkaGorhover" },
    { name: "Telegram", link: "https://t.me/hdmytro" },
    { name: "Twitter", link: "https://twitter.com/dghover" },
    { name: "Facebook", link: "https://www.facebook.com/dmitriy.gorhover" },
    { name: "LeetCode", link: "https://leetcode.com/dimkagorhover/" }
];

export const experiences = [
    {
        name: "Self-Employed",
        city: "Lviv, Ukraine",
        description: "Working on my internal projects",
        dates: {
            start: new Date(2020, 1 - 1, 1),
        },
        responsibility: "",
        techStack: {
            language: "Java 11+, Python",
            frameworks: "Spring Boot, RxJava 2, gRPC",
            prod_env: "Ansible + (Docker Swarm → Kubernetes)",
            build_tool: "Gradle 6+",
            ci_cd: "Jenkins, Gitlab",
            storage: "PostgreSQL, Redis",
            vcs: "Gitlab",
            metrics: "Prometheus + Grafana"
        }
    },
    {
        name: "Software Engineer ar N-IX",
        city: "Lviv, Ukraine",
        dates: {
            start: new Date(2019, 8 - 1, 1),
            end: new Date(2019, 12 - 1, 31)
        },
        description: "",
        responsibility: "",
        techStack: {
            language: "Java 6, Java 8",
            frameworks: "-",
            prod_env: "custom manual scripting",
            build_tool: "Maven 3.3.1",
            ci_cd: "Jenkins",
            storage: "-",
            vcs: "Subversion (git svn plugin)",
            metrics: "-"
        }
    },
    {
        name: "Senior Java Developer ar Intellias",
        city: "Lviv, Ukraine",
        dates: {
            start: new Date(2018, 11 - 1, 1),
            end: new Date(2019, 3 - 1, 15)
        },
        description: "",
        responsibility: "Implementing new Map Matcher algorithm based on Hidden Markov Model + Algorithm Viterbi",
        techStack: {
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
        id: 'exp_loopme',
        name: "Software Engineer at LoopMe",
        city: "Dnipro, Ukraine",
        dates: {
            start: new Date(2014, 7 - 1, 1),
            end: new Date(2018, 10 - 1, 30)
        },
        description: "\
            For a better understanding of what I did and what I do now, \
            I’ll split to 4 positions (periods of time):",
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
                responsibility: "\
                    Migrate from Ruby to Clojure, new features, develop fast solution for ad targeting \
                    (choosing best ad from big list of ads)",
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
                achievements: "\
                    I had to implement a very difficult task between 2 languages. \
                    It had to be easy if another team helped. But the idea was on PoC stage. \
                    I had to do it by myself. I did it successfully and I got \"Company Hero\" award and £100. \
                    This award is given once every six months.",
                description: null,
                currentState: "Migrated from Clojure to Java fully",
                responsibility: "\
                    Develop high-load ad-server, ad targeting, api’s for real time bidding platforms, \
                    migration from Clojure to Java.",
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
                responsibility: "\
                    Develop high-load ad-server, ad targeting, api’s for real time bidding platforms, \
                    api’s for front-end team.",
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
                achievements: "I’ve been working for Data Science team for about 2 years. \
                    As a result, I created high-performance java applications by using \
                    a small number of design patterns and different data structures \
                    with response ~1ms (99 percentile). I didn't use a lot of frameworks \
                    and libraries, and it helped with future migrations on new java versions.",
                responsibility: "\
                    Develop high-performance high-load applications \
                    for Data Science team, implement data science algorithms and adopt it for runtime, \
                    deliver prediction and bidding models to production, \
                    implement custom transport solutions for big prediction models, \
                    benchmarking, data structures investigation.",
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
    },
    {
        name: "Software Engineer at Ciklum",
        description: "I’ve been working on LoopMe project when it was Ciklum's outstaff project. \
            More details in \"Software Engineer at LoopMe\".",
        city: "Dnipro, Ukraine",
        dates: {
            start: new Date(2014, 7 - 1, 1),
            end: new Date(2015, 11 - 1, 1)
        }
    },
    {
        name: "Software/Java Engineer at PrivatBank",
        city: "Dnipro, Ukraine",
        dates: {
            start: new Date(2013, 7 - 1, 1),
            end: new Date(2014, 7 - 1, 30)
        },
        description: "I’ve been involved to develop such project like:"
    },
    {
        name: "Software/Java Engineer at PrivatBank",
        responsibility: "\
            Small features (clinet messages counters, form \"don't block credit card abroad\", etc.), \
            support, bugfix, unit testing, etc.",
        city: "Dnipro, Ukraine",
        dates: {
            start: new Date(2012, 2 - 1, 28),
            end: new Date(2013, 7 - 1, 1)
        },
        techStack: {
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
                    start: new Date(2012, 2 - 1, 28),
                    end: new Date(2013, 7 - 1, 1)
                },
                city: "Dnipro, Ukraine",
                responsibility: "\
                    Small features (clinet messages counters, form \"don't block credit card abroad\", etc.), \
                    support, bugfix, unit testing, etc.",
                description: "",
                techStack: {
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
                    start: new Date(2012, 2 - 1, 28),
                    end: new Date(2013, 7 - 1, 1)
                },
                city: "Dnipro, Ukraine",
                currentState: "acquired by Bank of Georgia",
                achievements: "\
                    The project was written via Netbeans New Project which based \
                    on custom Netbeans Ant scripts plus Java EE (EJB). It was impossible to move such project to, \
                    for example, new version of java, etc. I spend 4 weekends (days + nights) \
                    and migrated this project to Java 7 + Spring + Maven + Git. No mentors helped me. \
                    It was great experience for me that I remember in nowadays.",
                responsibility: "\
                    Develop and support internet banking web application, same as Privat24 Ukraine",
                description: "",
                techStack: {
                    language: "Java 6, JavaScript → Java 7, JavaScript",
                    frameworks: "Java EE (EJB), jQuery → Spring 3, jQuery",
                    prod_env: "custom",
                    build_tool: "Netbeans’ Ant scripts → Apache Maven",
                    ci_cd: "Jenkins",
                    storage: "Sybase, Redis, RabbitMQ",
                    vcs: "Subversion → Git (Gitlab)",
                    metrics: ""
                },
            },
            {
                name: "Privat24 A-Bank",
                dates: {
                    start: new Date(2012, 2 - 1, 28),
                    end: new Date(2013, 7 - 1, 1)
                },
                city: "Dnipro, Ukraine",
                responsibility: "\
                    Develop and support internet banking web application, same as Privat24 Ukraine",
                description: "",
                techStack: {
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
];
