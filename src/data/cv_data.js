import * as Nix from './Nix';
import * as Intellias from './intellias';
import * as LoopMe from './loopme';
import * as Ciklum from './ciklum';
import * as BRTP from './privat/BRTP';
import * as P24 from './privat/P24';

import { FEBRUARY, JANUARY, JUNE, SEPTEMBER, yearsOfExp } from '../common/dates';
import con from './contacts';

export { CurrentSkills as current_skills } from './CurrentSkills';

const first_working_day = new Date(2012, FEBRUARY, 28);

export const info = {
  first_working_day: first_working_day,
  language: [
    { name: 'English', level: 'Intermediate' },
    { name: 'Ukrainian', level: 'Native' },
    { name: 'Russian', level: 'Fluent' },
    { name: 'Deutsch', level: 'Elementary' },
  ],
  about_me: [
    `Software Engineer ${yearsOfExp(first_working_day)} years, 
    mostly Java and JVM based languages, such as Clojure, Groovy.
    `,
    `Passionate about Java, JVM, performance, benchmarking, 
    data structures, reactive streams.
    `,
    `Looking for New Challenges, Product Companies are more preferable, 
    full time, a remote is more preferable for now, but an office 
    is not the issue, relocation to other city/country is not an issue.
    `,
  ],
};

export const education = [
  {
    name: 'Ukrainian State Chemical Technology University',
    link: 'https://udhtu.edu.ua/en/',
    degree: {
      name: 'Bachelor',
      subject: 'Computer Science',
      paper: null,
    },
    location: 'Dnipro, Ukraine',
    dates: {
      start: new Date(2006, SEPTEMBER, 1),
      end: new Date(2010, JUNE, 1),
    },
  },
  {
    name: 'Ukrainian State Chemical Technology University',
    link: 'https://udhtu.edu.ua/en/',
    degree: {
      name: 'Master',
      subject: 'Computer Science',
      paper: null,
    },
    location: 'Dnipro, Ukraine',
    dates: {
      start: new Date(2010, SEPTEMBER, 1),
      end: new Date(2011, JUNE, 1),
    },
  },
];
export const contacts = con;

const self_employed_exp = () => {
  return {
    id: 'self_employed',
    position: 'Full-Stack Engineer',
    company: {
      name: 'Self-Employed',
    },
    location: {
      city: 'Lviv',
      country: 'Ukraine',
    },
    description: [
      `Personal R&D Project. Building k8s Cluster on Bare-Metal using Ansible from scratch. Tech stack: Ansible, VirtualBox (Alpine, CentOS, Ubuntu), Python3.`,
      `Developing Backend Application for Telegram Bot for scheduling different services. Tech Stack: Java11, Quarkus, Graal Native Image, Docker`,
      `Data processing for a retail company, recommendation platform. I also had to do a few tasks related to UI (Admin Console). Tech stack: Java8, Go, Docker, Kafka, Apache Spark, Redis, TypeScript, Angular 6, k8s, Azure Data Lake.`,
    ],
    achievements: [
      `Setup k8s Cluster from scratch on VirtualBox (Alpine Linux, 
        CentOS 7, Ubuntu 20.04) by using Ansible Playbooks`,
    ],
    dates: {
      start: new Date(2020, JANUARY, 1),
    },
    responsibility: [],
    techStack: {
      language: ['Java 8', 'Java 15', 'GraalVM 20.1 (Java 11)', 'Python 3', 'Go', 'JavaScript', 'TypeScript'],
      frameworks: ['Spring Boot', 'Quarkus', 'RxJava 2', 'gRPC', 'ReactJS', 'Angular 6'],
      prod_env: [
        'VirtualBox (Alpine Linux 3.11 + CentOS 7 + Ubuntu 20.04)',
        'Ansible',
        'Docker Compose',
        'Docker Swarm',
        'Kubernetes 1.18.2',
      ],
      build_tool: ['Gradle 6', 'Apache Maven'],
      ci_cd: ['Jenkins', 'Github Actions', 'Gitlab'],
      storage: ['PostgreSQL', 'Redis', 'Zookeeper', 'Kafka', 'Min.io', 'H2DB'],
      vcs: ['Github', 'Gitlab', 'Gitea'],
      metrics: ['Prometheus', 'Grafana'],
    },
  };
};

export const experiences = [
  self_employed_exp(),
  Nix.exp(),
  Intellias.exp(),
  LoopMe.exp(),
  Ciklum.exp(),
  BRTP.exp(),
  P24.exp(),
];
