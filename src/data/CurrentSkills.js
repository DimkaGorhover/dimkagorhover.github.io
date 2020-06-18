import React from 'react'
import { differenceInYears as diffYears } from 'date-fns'
import { exp02 as clojureExp, exp as loopmeExp } from './loop_me'

import {
    FaJava as JavaIcon,
    FaJs as JsIcon,
    FaPython as PythonIcon,
    FaLinux as LinuxIcon,
    FaDocker as DockerIcon
} from 'react-icons/fa'

import {
    DiRedis as RedisIcon,
    DiPostgresql as PostgresIcon,
    DiWindows as WindowsIcon
} from 'react-icons/di'

const Icon = ({ icon, children }) => {
    return (
        <>
            {/* {icon()} */}
            {` ${children}`}
        </>
    )
}


export const CurrentSkills = () => {

    const currentDate = new Date()
    const clojureLastDate = clojureExp().dates.end
    const gcpLastDate = loopmeExp().dates.end

    return ([
        {
            name: "Languages",
            value: [
                (<Icon icon={JavaIcon}>Java (Versions 6+)</Icon>),
                `Clojure (2 years on prod, ${diffYears(currentDate, clojureLastDate)} years ago)`,
                (<Icon icon={PythonIcon}>Python</Icon>),
                (<Icon icon={JsIcon}>JavaScript</Icon>),
                "Go (beginner)",
                (<Icon icon={LinuxIcon}>{"Shell {sh, bash, zsh} (low-mid)"}</Icon>)
            ]
        },
        {
            name: "Frameworks",
            value: [
                "Spring (Boot, Web, etc.)",
                "Reactive Streams (RxJava, Project Reactor)",
                "Quarkus",
                "gRPC",
                "React.js"
            ]
        },
        {
            name: "OS",
            value: [
                "Linux (Ubuntu, Mint, Alpine, CentOS)",
                "Mac OS",
                (<Icon icon={WindowsIcon}>Windows</Icon>)
            ]
        },
        {
            name: "Data Bases",
            value: [
                (<Icon icon={RedisIcon}>Redis</Icon>),
                (<Icon icon={PostgresIcon}>PostgreSQL</Icon>),
                "Zookeeper",
                "Kafka"
            ]
        },
        {
            name: "Tools",
            value: [
                (<Icon icon={DockerIcon}>Docker</Icon>),
                (<Icon icon={DockerIcon}>Docker-Compose</Icon>),
                "Ansible"
            ]
        },
        {
            name: "Clusters",
            value: [
                "Kubernetes",
                (<Icon icon={DockerIcon}>Docker Swarm</Icon>)
            ]
        },
        {
            name: "Clouds",
            value: [
                `Google Cloud Platform (user, ${diffYears(currentDate, gcpLastDate)} years ago)`,
                "AWS (beginner)"
            ]
        }
    ])
}
