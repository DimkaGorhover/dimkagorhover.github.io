const p24ukraine = () => {
    return {
        id: "privat24_ukraine",
        name: "Privat24 Ukraine",
        showDates: false,
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
        id: "privat24_georgia",
        name: "Privat24 Georgia",
        showDates: false,
        dates: {
            start: new Date(2012, 2 - 1, 28),
            end: new Date(2013, 7 - 1, 1)
        },
        city: "Dnipro, Ukraine",
        // currentState: "acquired by Bank of Georgia",
        achievements: [`
            I spend 4 weekends (mostly nights) and migrated this project 
            from an old stack of technology (Java 6 + Apache Ant) 
            to a new one (Java 7 + Spring + Apache Maven + Git).
            `, `
            Unfortunately, there weren't mentors to help me. 
            And based on my lack of knowledge it was very stressful for me, 
            but as a result, I got a great experience that I remember nowadays.
            `],
        responsibility: `
            Develop and support internet banking web application, same as Privat24 Ukraine
            `,
        description: "",
        techStack: {
            language: "Java 6, JavaScript → Java 7, JavaScript",
            frameworks: "Java EE (EJB), jQuery → Spring 3, jQuery",
            prod_env: "custom",
            build_tool: "Netbeans’ Apache Ant scripts → Apache Maven",
            ci_cd: "Jenkins",
            storage: "Sybase, Redis, RabbitMQ",
            vcs: "Subversion → Git (Gitlab)",
            metrics: ""
        },
    }
}

const p24abank = () => {
    return {
        id: "privat24_a_bank",
        name: "Privat24 A-Bank",
        showDates: false,
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
        id: "software_java_engineer_at_privat_bank",
        name: "Software/Java Engineer at PrivatBank",
        links: [
            {
                name: "PrivatBank.ua",
                url: "https://privatbank.ua"
            },
            {
                name: "Privat24.ua",
                url: "https://privat24.ua"
            }
        ],
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
