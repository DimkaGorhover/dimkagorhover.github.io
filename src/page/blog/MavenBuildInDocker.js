import { useTitle } from '../../common';
import { Makefile } from '../../components/code';

export const title = 'How to build Maven project using Docker with local m2 cache';

export const tags = [
  'maven',
  'java',
  'docker'
];

const mavenBuildInDockerCode = `
inner_m2=/var/maven/.m2
mvn_opts=\
	-o \
	-q \
	-T1.0C \
	-DskipTests \
	-DskipITs \
	-Dmaven.repo.local=$(inner_m2)/repository \
	-s $(inner_m2)/settings.xml

build:
	@docker run --rm -i -t \
		--cpu-quota 800000 \
		--memory 600m \
		--memory-reservation 600m \
		--memory-swap 0 \
		--user $(shell id -u):$(shell id -g) \
		-e MAVEN_CONFIG=$(inner_m2) \
		-e MAVEN_OPTS="-server -Xms500m -Xmx500m -XX:+UseG1GC" \
		-v \${HOME}/.m2:$(inner_m2) \
		-v $(shell pwd):/app \
		-w /app \
		maven:3.6.3-openjdk-8-slim \
		mvn $(mvn_opts) clean

`.trim();

export function MavenBuildInDocker() {
  useTitle(title);
  return (
    <>
      <h1>{title}</h1>
      <Makefile>{mavenBuildInDockerCode}</Makefile>
    </>
  );
}
