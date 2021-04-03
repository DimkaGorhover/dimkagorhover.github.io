import React from 'react';
import * as Icons from '../components/icons';
import * as Tech from '../components/tech';

const Icon = ({ icon: Icon, children }) => {
  if (!Icon) {
    return <span>{children}</span>;
  }
  return (
    <>
      <Icon />
      {` ${children}`}
    </>
  );
};

export const CurrentSkills = () => {
  return [
    {
      name: 'Languages',
      value: [
        <Tech.Java />,
        <Tech.Clojure />,
        <Tech.Go />,
        <Tech.Js />,
        <Tech.Python />,
        <Tech.Linux title={'Bash'} />,
      ],
    },
    {
      name: 'Frameworks',
      value: [
        <Tech.Spring title='Spring' />,
        <Tech.Spring title='Spring Boot' />,
        <Icon icon={Icons.Rx}>Reactive Streams (RxJava, Project Reactor)</Icon>,
        <Icon>gRPC</Icon>,
        <Tech.Quarkus />,
        <Tech.React />,
        <Tech.Redux />,
      ],
    },
    {
      name: 'DB',
      value: [<Tech.Redis />, <Tech.Postgres />, <Tech.Kafka />, <Icon icon={Icons.Spark}>Apache Spark</Icon>],
    },
    {
      name: 'DevOps',
      value: [
        <Tech.Docker />,
        <Tech.Ansible />,
        <Icon icon={Icons.K8S}>Kubernetes</Icon>,
        <Icon icon={Icons.GCP}>Google Cloud Platform</Icon>,
        <Icon icon={Icons.Aws}>AWS</Icon>,
      ],
    },
    {
      name: 'Common',
      value: [<Tech.Github />, <Tech.Gitlab />, <Tech.Datadog />],
    },
    {
      name: 'OS',
      value: [<Tech.Linux />, <Icon icon={Icons.Apple}>Mac OS</Icon>, <Icon icon={Icons.Windows}>Windows</Icon>],
    },
  ];
};
