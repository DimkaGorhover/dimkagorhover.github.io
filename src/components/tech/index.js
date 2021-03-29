import { Kafka } from './Kafka';

const tech = {};
tech['kafka'] = Kafka;

export function find(name) {
  return name && tech[name.toLowerCase()];
}

export { Java } from './Java';
export { Kafka } from './Kafka';
