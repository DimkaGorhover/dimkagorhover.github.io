import * as Nix from './data/Nix'
import * as Intellias from './data/Intellias'
import * as LoopMe from './data/LoopMe'
import * as Ciklum from './data/Ciklum'
import * as BRTP from './data/privat/BRTP'
import * as P24 from './data/privat/P24'
import { CurrentSkills } from './data/CurrentSkills'
import { yearsOfExp } from './utils/CustomDateUtils'

const first_working_day = new Date(2012, 2, 28)

export const info = {
    first_working_day: first_working_day,
    about_me: [
        `Software Engineer ${yearsOfExp(first_working_day)} years, mostly Java.`,
        `Passionate of java, jvm, performance, benchmarking, data structures, reactive streams.`
    ]
}

export const education = [
    // {
    //     name: "Scool",
    //     location: "Dnipro, Ukraine",
    //     dates: {
    //         start: new Date(2006, 9 - 1, 1),
    //         end: new Date(2011, 6 - 1, 1)
    //     }
    // },
    {
        name: "Ukrainian State Chemical Technology University",
        degree: {
            name: "Master Degree",
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
    { name: "gd.mail.89@gmail.com", link: "mailto:gd.mail.89@gmail.com" },
    { name: "Skype ( dier_89 )", link: "skype:dier_89" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/dmitriy-gorkhover/" },
    { name: "Github", link: "https://github.com/DimkaGorhover" },
    { name: "Telegram", link: "https://t.me/hdmytro" },
    { name: "Twitter", link: "https://twitter.com/dghover" },
    { name: "Facebook", link: "https://www.facebook.com/dmitriy.gorhover" },
    { name: "LeetCode", link: "https://leetcode.com/dimkagorhover/" }
];

export const current_skills = CurrentSkills()

const self_employed_exp = () => {
    return ({
        id: "self_employed",
        name: "Self-Employed Full-Stack Engineer",
        city: "Lviv, Ukraine",
        description: [
            "Working on my internal projects."
        ],
        achievements: [
            `
            Setup k8s Cluster from scratch on VirtualBox (Alpine Linux, CentOS 7, Ubuntu 20.04) 
            by using Ansible Playbooks
            `
        ],
        dates: {
            start: new Date(2020, 1 - 1, 1),
        },
        responsibility: [
            ""
        ],
        techStack: {
            language: [
                "Java 14",
                "Python 3.8",
                "JavaScript"
            ],
            frameworks: [
                "Spring Boot", "RxJava 2", "gRPC",
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
