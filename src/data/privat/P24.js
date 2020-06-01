const p24ukraine = () => {
    return {
        name: "Privat24 Ukraine",
        dates: {
            start: new Date(2012, 2 - 1, 28),
            end: new Date(2013, 7 - 1, 1)
        },
        city: "Dnipro, Ukraine",
        responsibility: `
            Small features (clinet messages counters, form "don't block credit card abroad", etc.),
            support, bugfix, unit testing, etc.
            `,
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
    }
}

const p24georgia = () => {
    return {
        name: "Privat24 Georgia",
        dates: {
            start: new Date(2012, 2 - 1, 28),
            end: new Date(2013, 7 - 1, 1)
        },
        city: "Dnipro, Ukraine",
        currentState: "acquired by Bank of Georgia",
        achievements: `
            The project was written via Netbeans New Project which based
            on custom Netbeans Ant scripts plus Java EE (EJB). It was impossible to move such project to,
            for example, new version of java, etc. I spend 4 weekends (days + nights)
            and migrated this project to Java 7 + Spring + Maven + Git. No mentors helped me.
            It was great experience for me that I remember in nowadays.
            `,
        responsibility: `
            Develop and support internet banking web application, same as Privat24 Ukraine
            `,
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
    }
}

const p24abank = () => {
    return {
        name: "Privat24 A-Bank",
        dates: {
            start: new Date(2012, 2 - 1, 28),
            end: new Date(2013, 7 - 1, 1)
        },
        city: "Dnipro, Ukraine",
        responsibility: `
            Develop and support internet banking web application, same as Privat24 Ukraine
            `,
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
}

export const exp = () => {
    return {
        name: "Software/Java Engineer at PrivatBank",
        responsibility: `
            Small features (clinet messages counters, form "don't block credit card abroad", etc.),
            support, bugfix, unit testing, etc.
            `,
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
            p24ukraine(),
            p24georgia(),
            p24abank()
        ]
    }
}
