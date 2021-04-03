import * as Icons from '../icons';
import { BlankLink } from '../common';
import PropTypes from 'prop-types';
import styles from './Technology.module.scss';

const all = {};

function createTechnologyComponent({ name, icon: Icon, link = '' }) {
  const defLink = link;
  const defTitle = name;

  function Technology({ title = defTitle, link = defLink }) {
    if (link) {
      return (
        <BlankLink href={link}>
          <span className={styles.icon}>
            <Icon />{' '}
          </span>
          <span>{title}</span>
        </BlankLink>
      );
    }
    return (
      <>
        <Icon /> {title}
      </>
    );
  }

  Technology.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
  };

  return Technology;
}

export const Java = createTechnologyComponent({ name: 'Java', icon: Icons.Java, link: 'https://java.com' });
all.java = Java;

export const Kafka = createTechnologyComponent({
  name: 'Apache Kafka',
  icon: Icons.Kafka,
  link: 'https://kafka.apache.org/',
});
all.kafka = Kafka;

export const Cassandra = createTechnologyComponent({
  name: 'Cassandra',
  icon: Icons.Cassandra,
  link: 'https://cassandra.apache.org/',
});
all.cassandra = Cassandra;

export const Linux = createTechnologyComponent({
  name: 'Linux',
  icon: Icons.Linux,
  link: 'https://www.linuxfoundation.org/',
});
all.linux = Linux;

export const Redis = createTechnologyComponent({
  name: 'Redis',
  icon: Icons.Redis,
  link: 'https://redis.io/',
});
all.redis = Redis;

export const Postgres = createTechnologyComponent({
  name: 'Postgres',
  icon: Icons.Postgres,
  link: 'https://www.postgresql.org/',
});
all.postgres = Postgres;

export const Clojure = createTechnologyComponent({
  name: 'Clojure',
  icon: Icons.Clojure,
  link: 'https://clojure.org/',
});
all.clojure = Clojure;

export const Python = createTechnologyComponent({
  name: 'Python',
  icon: Icons.Python,
});
all.python = Python;

export const Spring = createTechnologyComponent({
  name: 'Spring',
  icon: Icons.Spring,
  link: 'https://spring.io/',
});
all.spring = Spring;

export const Quarkus = createTechnologyComponent({
  name: 'Quarkus',
  icon: Icons.Quarkus,
  link: 'https://quarkus.io/',
});
all.quarkus = Quarkus;

export const Js = createTechnologyComponent({
  name: 'Js',
  icon: Icons.Js,
});
export const JavaScript = Js;
all.js = Js;
all.javascript = JavaScript;

export const React = createTechnologyComponent({
  name: 'React',
  icon: Icons.React,
  link: 'https://reactjs.org/',
});
all.react = React;
all.reactjs = React;

export const Redux = createTechnologyComponent({
  name: 'Redux',
  icon: Icons.Redux,
  link: 'https://redux.js.org/',
});
all.redux = Redux;

export const Go = createTechnologyComponent({ name: 'Go', icon: Icons.Go });
export const Golang = Go;
all.go = Go;
all.golang = Golang;

export const Ansible = createTechnologyComponent({
  name: 'Ansible',
  icon: Icons.Ansible,
  link: 'https://www.ansible.com/',
});
all.ansible = Ansible;

export const Datadog = createTechnologyComponent({
  name: 'Datadog',
  icon: Icons.Datadog,
  link: 'https://www.datadoghq.com/',
});
all.datadog = Datadog;

export const Docker = createTechnologyComponent({
  name: 'Docker',
  icon: Icons.Docker,
  link: 'https://www.docker.com/',
});
all.docker = Docker;

export const Github = createTechnologyComponent({
  name: 'Github',
  icon: Icons.Github,
  link: 'https://www.github.com/',
});
all.github = Github;

export const Gitlab = createTechnologyComponent({
  name: 'Gitlab',
  icon: Icons.Gitlab,
  link: 'https://www.gitlab.com/',
});
all.gitlab = Gitlab;
