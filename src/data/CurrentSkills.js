import React from 'react';
import { differenceInYears as diffYears } from 'date-fns';
import { exp02 as clojureExp } from './loopme';
import * as Icons from '../components/icons';

const Icon = ({ icon: Icon, children }) => {
  if (!Icon) {
    return <span>{children}</span>;
  }
  return (
    <span>
      <Icon />
      {` ${children}`}
    </span>
  );
};

export const CurrentSkills = () => {
  const currentDate = new Date();
  const clojureLastDate = clojureExp().dates.end;

  return [
    {
      name : 'Languages',
      value: [
        <Icon icon={Icons.Java}>Java (Versions 6+)</Icon>,
        <Icon icon={Icons.Clojure}>{`Clojure (2 years on prod, ${diffYears(
          currentDate,
          clojureLastDate,
        )} years ago)`}</Icon>,
        <Icon icon={Icons.Python}>Python</Icon>,
        <Icon icon={Icons.Js}>JavaScript</Icon>,
        <Icon icon={Icons.Go}>Go</Icon>,
        <Icon icon={Icons.Linux}>{'Shell {sh, bash, zsh} (low-mid)'}</Icon>,
      ],
    },
    {
      name : 'Frameworks',
      value: [
        <Icon icon={Icons.Spring}>Spring (Boot, Web, etc.)</Icon>,
        <Icon icon={Icons.Rx}>Reactive Streams (RxJava, Project Reactor)</Icon>,
        <Icon>gRPC</Icon>,
        <Icon icon={Icons.Quarkus}>Quarkus</Icon>,
        <Icon icon={Icons.Spark}>Apache Spark</Icon>,
        <Icon icon={Icons.ReactJs}>ReactJS</Icon>,
        <Icon icon={Icons.Redux}>Redux</Icon>,
      ],
    },
    {
      name : 'OS',
      value: [
        <Icon icon={Icons.Mint}>Linux Mint</Icon>,
        <Icon icon={Icons.Ubuntu}>Ubuntu</Icon>,
        <Icon icon={Icons.Alpine}>Linux Alpine</Icon>,
        <Icon icon={Icons.Centos}>CentOS</Icon>,
        <Icon icon={Icons.Apple}>Mac OS</Icon>,
        <Icon icon={Icons.Windows}>Windows</Icon>,
      ],
    },
    {
      name : 'Data Bases',
      value: [
        <Icon icon={Icons.Redis}>Redis</Icon>,
        <Icon icon={Icons.Postgres}>PostgreSQL</Icon>,
        <Icon icon={Icons.Kafka}>Kafka</Icon>,
      ],
    },
    {
      name : 'DevOps',
      value: [
        <Icon icon={Icons.Docker}>Docker</Icon>,
        <Icon icon={Icons.Docker}>Docker-Compose</Icon>,
        <Icon icon={Icons.Ansible}>Ansible</Icon>,
        <Icon icon={Icons.K8S}>Kubernetes</Icon>,
        <Icon icon={Icons.Docker}>Docker Swarm</Icon>,
        <Icon icon={Icons.GCP}>Google Cloud Platform</Icon>,
        <Icon icon={Icons.Aws}>AWS</Icon>,
      ],
    },
  ];
};
