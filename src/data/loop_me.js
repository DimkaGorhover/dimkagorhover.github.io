const exp01 = () => {
    return {
        id: 'software_engineer_at_loopme_001',
        name: "Clojure Developer in Ad Server Team",
        city: "Dnipro, Ukraine",
        dates: {
            start: new Date(2014, 7 - 1, 1),
            end: new Date(2015, 2 - 1, 1)
        },
        description: [

        ],
        responsibility: [
            `
            Migration from Ruby to Clojure, new features, develop fast solution for ad targeting
            (choosing best ad from big list of ads)
            `
        ],
        techStack: {
            language: "Clojure (based on Java 8)",
            frameworks: "many Clojure specific libraries",
            prod_env: "Bare-Metal Servers provisioned by Chef",
            build_tool: "Leiningen",
            ci_cd: "Travis CI",
            storage: [
                "PostgreSQL",
                "Redis",
                "Elasticsearch"
            ],
            vcs: "Git (Github)",
            metrics: [
                "NewRelic",
                "Elasticsearch"
            ]
        }
    }
}

const exp02 = () => {
    return {
        id: 'software_engineer_at_loopme_002',
        name: "Clojure/Java Developer in Ad Server Team",
        city: "Dnipro, Ukraine",
        dates: {
            start: exp01().dates.end,
            end: new Date(2016, 3 - 1, 1)
        },
        achievements: [
            `
            I had to implement a very difficult task between 2 languages. 
            It had to be easy if another team helped. But the idea was on PoC stage. 
            I had to do it by myself. I did it successfully and I got "Company Hero" award and £100. 
            This award is given once every six months.
            `],
        description: null,
        currentState: "Migrated from Clojure to Java fully",
        responsibility: [
            `
            Develop high-load ad-server, ad targeting, api’s for real time bidding platforms,
            migration from Clojure to Java.
            `],
        techStack: {
            language: "Java 8, Clojure (based on Java 8)",
            frameworks: "Spring Boot, Spring 4",
            prod_env: "Chef + (Apache Mesos + Marathon)",
            build_tool: "Leiningen (for Clojure Projects), Apache Maven 3+ (for Java Projects)",
            ci_cd: [
                "Travis CI (for Ruby and Clojure)", "Jenkins (for Java)"
            ],
            storage: "PostgreSQL, Redis, Elasticsearch",
            vcs: "Git (Github)",
            metrics: "Datadog → Grafana + InfluxDB"
        }
    }
}

const exp03 = () => {
    return {
        id: 'software_engineer_at_loopme_003',
        name: "Java Developer in Ad Server Team",
        city: "Dnipro, Ukraine",
        dates: {
            start: exp02().dates.end,
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
    }
}

const exp04 = () => {
    return {
        id: 'software_engineer_at_loopme_004',
        name: "Java Developer in Data Science Team",
        city: "Dnipro, Ukraine",
        dates: {
            start: exp03().dates.end,
            end: new Date(2018, 11 - 1, 1)
        },
        achievements: [
            `
            I’ve been working for Data Science team for about 2 years.
            As a result, I created high-performance java applications by using
            a small number of design patterns and different data structures
            with response ~1ms (99 percentile).
            `,
            `
            I didn't use a lot of frameworks
            and libraries, and it helped with future migrations on new java versions.
            `
        ],
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
}

export const exp = () => {
    const inner = [
        exp01(),
        exp02(),
        exp03(),
        exp04()
    ]

    const linkToExpFn = ({ name, id }) => {
        return {
            name: `CV: ${name}`,
            url: `#${id}`,
            target: "_self"
        }
    }

    return {
        id: 'software_engineer_at_loopme',
        name: "Software Engineer at LoopMe",
        city: "Dnipro, Ukraine",
        links: [
            {
                name: "LoopMe.com",
                url: "https://loopme.com"
            },
            linkToExpFn(exp01()),
            linkToExpFn(exp02()),
            linkToExpFn(exp03()),
            linkToExpFn(exp04())
        ],
        dates: {
            start: new Date(2014, 7 - 1, 1),
            end: new Date(2018, 10 - 1, 30)
        },
        description: [
            `
            LoopMe's full-stack tech platform harnesses mobile data, 
            using a powerful combination of attribution, Artificial Intelligence, 
            and analytics to deliver outstanding campaign performance against 
            brand outcomes — consideration, purchase intent, foot traffic, and offline sales.
            `, `
            The company was founded by experienced mobile advertising executives 
            Stephen Upstone (CEO) and Marco Van de Bergh (CTO) in 2012. 
            LoopMe has global offices in London, New York, Dnipro, Chicago, LA, 
            Atlanta, Boston, Dallas, Detroit, San Francisco, Singapore, Beijing, Dubai, and Johannesburg.
            `
        ],
        responsibility: [
            `
            My responsibility was in developing backend Clojure/Java Applications
            (APIs) for the front end team and other clients. 
            `,
            `
            The major task was to develop a fault tolerance application 
            that should handle big amount of traffic and store it to a database.
            `,
            `
            For a better understanding of what I was doing, 
            I split the description of my experience 
            in LoopMe into 4 parts (periods) that you can find below.
            `
        ],
        achievements: null,
        currentState: null,
        inner: inner
    }
}
