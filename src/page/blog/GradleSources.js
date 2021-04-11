import { useTitle } from '../../common';
import { Gradle } from '../../components/code';

export const title = 'How to download Java sources/docs using Gradle';

const buildGradleCode = `
apply plugin: 'java'
apply plugin: 'idea'

idea {
  module {
    downloadJavadoc = true
    downloadSources = true
  }
}
`.trim();

const gradleExecCode = `
gradle   cleanIdea idea 
./gradlew cleanIdea idea 
`.trim();

export function GradleSources() {
  useTitle(title);
  return (
    <>
      <h1>{title}</h1>
      <Gradle>{buildGradleCode}</Gradle>
      <Gradle>{gradleExecCode}</Gradle>
    </>
  );
}
