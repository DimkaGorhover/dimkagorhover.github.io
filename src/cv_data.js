import * as Nix from './data/Nix'
import * as Intellias from './data/Intellias'
import * as LoopMe from './data/LoopMe'
import * as Ciklum from './data/Ciklum'
import * as BRTP from './data/privat/BRTP'
import * as P24 from './data/privat/P24'

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
    Nix.exp(),
    Intellias.exp(),
    LoopMe.exp(),
    Ciklum.exp(),
    BRTP.exp(),
    P24.exp()
];
