import React from 'react';
import * as Icons from '../components/icons';
import * as Tech from '../components/tech';

// @deprecated
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

export const CurrentSkills = [
  {
    name : 'Languages',
    value: [<Tech.Java />, <Tech.Clojure />, <Tech.Go />, <Tech.Js />, <Tech.Python />, <Tech.Linux title={'Bash'} />],
  },
  {
    name : 'Frameworks',
    value: [
      <Tech.Spring title='Spring' />,
      <Tech.Spring title='Spring Boot' />,
      <Icon icon={Icons.Rx}>Reactive Streams (RxJava, Project Reactor)</Icon>,
      <Icon>gRPC</Icon>,
      <Tech.Spark />,
      <Tech.Quarkus />,
      <Tech.React />,
      <Tech.Redux />,
    ],
  },
  {
    name : 'DB',
    value: [<Tech.Redis />, <Tech.Postgres />, <Tech.Kafka />, <Tech.Elasticsearch />],
  },
  {
    name : 'DevOps',
    value: [<Tech.Docker />, <Tech.Ansible />, <Tech.Kubernetes />, <Tech.GCP />, <Tech.Aws />],
  },
  {
    name : 'Common',
    value: [<Tech.Github />, <Tech.Gitlab />, <Tech.Datadog />, <Tech.Prometheus />, <Tech.Grafana />],
  },
  {
    name : 'OS',
    value: [<Tech.Linux />, <Icon icon={Icons.Apple}>Mac OS</Icon>, <Icon icon={Icons.Windows}>Windows</Icon>],
  },
];
