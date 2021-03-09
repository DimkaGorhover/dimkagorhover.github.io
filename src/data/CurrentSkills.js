import React from 'react'
import { differenceInYears as diffYears } from 'date-fns'
import { exp as loopmeExp, exp02 as clojureExp } from './loopme'

import {
  FaApple as AppleIcon,
  FaDocker as DockerIcon,
  FaJava as JavaIcon,
  FaJs as JsIcon,
  FaLinux as LinuxIcon,
  FaPython as PythonIcon,
  FaStream as RxIcon
} from 'react-icons/fa'

import {
  SiAlpinelinux as AlpineIcon,
  SiAnsible as AnsibleIcon,
  SiApachekafka as KafkaIcon,
  SiCentos as CentosIcon,
  SiKubernetes as K8SIcon,
  SiLinuxmint as MintIcon,
  SiQuarkus as QuarkusIcon,
  SiSpring as SpringIcon,
  SiUbuntu as UbuntuIcon
} from 'react-icons/si'

import {
  DiAws as AwsIcon,
  DiGoogleCloudPlatform as GCPIcon,
  DiPostgresql as PostgresIcon,
  DiRedis as RedisIcon,
  DiWindows as WindowsIcon,
  DiSpark as SparkIcon
} from 'react-icons/di'
import { GrGolang as GoIcon, GrReactjs as ReactJsIcon } from "react-icons/gr";

const Icon = ({ icon, children }) => {
  return (
    <>
      {/*{icon()}*/}
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
      name : 'Languages',
      value: [
        (<Icon icon={JavaIcon}>Java (Versions 6+)</Icon>),
        `Clojure (2 years on prod, ${diffYears(currentDate, clojureLastDate)} years ago)`,
        (<Icon icon={PythonIcon}>Python</Icon>),
        (<Icon icon={JsIcon}>JavaScript</Icon>),
        (<Icon icon={GoIcon}>Go</Icon>),
        (<Icon icon={LinuxIcon}>{'Shell {sh, bash, zsh} (low-mid)'}</Icon>)
      ]
    },
    {
      name : 'Frameworks',
      value: [
        (<Icon icon={SpringIcon}>Spring (Boot, Web, etc.)</Icon>),
        (<Icon icon={RxIcon}>Reactive Streams (RxJava, Project Reactor)</Icon>),
        (<Icon icon={QuarkusIcon}>Quarkus</Icon>),
        'gRPC',
        (<Icon icon={QuarkusIcon}>Quarkus</Icon>),
        (<Icon icon={ReactJsIcon}>ReactJS</Icon>),
        (<Icon icon={SparkIcon}>Apache Spark</Icon>),
      ]
    },
    {
      name : 'OS',
      value: [
        (<Icon icon={MintIcon}>Linux Mint</Icon>),
        (<Icon icon={UbuntuIcon}>Ubuntu</Icon>),
        (<Icon icon={AlpineIcon}>Linux Alpine</Icon>),
        (<Icon icon={CentosIcon}>CentOS</Icon>),
        (<Icon icon={AppleIcon}>Mac OS</Icon>),
        (<Icon icon={WindowsIcon}>Windows</Icon>)
      ]
    },
    {
      name : 'Data Bases',
      value: [
        (<Icon icon={RedisIcon}>Redis</Icon>),
        (<Icon icon={PostgresIcon}>PostgreSQL</Icon>),
        'Zookeeper',
        (<Icon icon={KafkaIcon}>Kafka</Icon>)
      ]
    },
    {
      name : 'Tools',
      value: [
        (<Icon icon={DockerIcon}>Docker</Icon>),
        (<Icon icon={DockerIcon}>Docker-Compose</Icon>),
        (<Icon icon={AnsibleIcon}>Ansible</Icon>)
      ]
    },
    {
      name : 'Clusters',
      value: [
        (<Icon icon={K8SIcon}>Kubernetes</Icon>),
        (<Icon icon={DockerIcon}>Docker Swarm</Icon>)
      ]
    },
    {
      name : 'Clouds',
      value: [
        // `Google Cloud Platform (user, ${diffYears(currentDate, gcpLastDate)} years ago)`,
        (<Icon icon={GCPIcon}>Google Cloud Platform</Icon>),
        // 'AWS (beginner)',
        (<Icon icon={AwsIcon}>AWS</Icon>),
      ]
    }
  ])
}
