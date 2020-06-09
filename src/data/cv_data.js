import * as Nix from './Nix'
import * as Intellias from './intellias'
import * as LoopMe from './loop_me'
import * as Ciklum from './ciklum'
import * as BRTP from './privat/BRTP'
import * as P24 from './privat/P24'
import { CurrentSkills } from './CurrentSkills'
import { yearsOfExp } from '../utils/CustomDateUtils'

const first_working_day = new Date(2012, 2, 28)

export const info = {
    first_working_day: first_working_day,
    language: [
        { name: "English", level: "Intermediate" },
        { name: "Ukrainian", level: "Native" },
        { name: "Russian", level: "Fluent" }
    ],
    about_me: [
        `Software Engineer ${yearsOfExp(first_working_day)} years, 
        mostly Java and JVM based languages, such as Clojure, Groovy.
        `,
        `Passionate about Java, JVM, performance, benchmarking, 
        data structures, reactive streams.
        `,
        `Looking for New Challenges, Product Companies is more preferable, 
        full time, a remote is more preferable for now, 
        but an office is not the issue, relocation is not an issue as well.
        `
    ]
}

export const education = [
    {
        name: "Ukrainian State Chemical Technology University",
        degree: {
            name: "Master",
            subject: "Computer Science",
            paper: null,
        },
        location: "Dnipro, Ukraine",
        dates: {
            start: new Date(2006, 9 - 1, 1),
            end: new Date(2011, 6 - 1, 1)
        }
    }
]

export const contacts = [
    { important: true, name: "Email ( gd.mail.89@gmail.com )", link: "mailto:gd.mail.89@gmail.com" },
    { important: true, name: "Skype ( dier_89 )", link: "skype:dier_89" },
    { important: true, name: "LinkedIn ( dmitriy-gorkhover )", link: "https://www.linkedin.com/in/dmitriy-gorkhover/" },

    { important: false, name: "Github", link: "https://github.com/DimkaGorhover" },
    { important: false, name: "Telegram", link: "https://t.me/hdmytro" },
    { important: false, name: "Twitter", link: "https://twitter.com/dghover" },
    { important: false, name: "Facebook", link: "https://www.facebook.com/dmitriy.gorhover" },
    { important: false, name: "LeetCode", link: "https://leetcode.com/dimkagorhover/" }
];

export const current_skills = CurrentSkills()

const self_employed_exp = () => {
    return ({
        id: "self_employed",
        name: "Self-Employed Full-Stack Engineer (Freelance)",
        city: "Lviv, Ukraine",
        description: [
            `Building k8s Cluster on Bare-Metal using Ansible from scratch, 
            Developing Backend Application for Telegram Bot by using 
            Quarkus Framework + Graal Native Image + Docker`
        ],
        achievements: [
            `Setup k8s Cluster from scratch on VirtualBox (Alpine Linux, 
            CentOS 7, Ubuntu 20.04) by using Ansible Playbooks`
        ],
        dates: {
            start: new Date(2020, 1 - 1, 1),
        },
        responsibility: [],
        techStack: {
            language: [
                "Java 14",
                "GraalVM 20.1 (Java 11)",
                "Python 3.8",
                "JavaScript"
            ],
            frameworks: [
                "Spring Boot",
                "RxJava 2",
                "gRPC",
                "React.JS"
            ],
            prod_env: [
                "VirtualBox (Alpine Linux 3.11 + CentOS 7 + Ubuntu 20.04)",
                "Ansible 2.9+",
                "Docker Swarm → Kubernetes 1.18.2"
            ],
            build_tool: ["Gradle 6+"],
            ci_cd: [
                "Jenkins", "Gitlab"
            ],
            storage: ["PostgreSQL", "Redis"],
            vcs: [
                "Gitlab"
            ],
            metrics: "Prometheus + Grafana (in progress...)"
        }
    })
}

export const experiences = [
    self_employed_exp(),
    Nix.exp(),
    Intellias.exp(),
    LoopMe.exp(),
    Ciklum.exp(),
    BRTP.exp(),
    P24.exp()
];
