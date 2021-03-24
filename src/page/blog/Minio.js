import { useTitle } from '../../common';
import { Yaml } from '../../components/code/Yaml';

export const Minio = () => {
  useTitle('Blog: Minio Cluster');

  const code = `
services:
  minio:
    image: minio:latest
  `.trim();

  return (
    <>
      <h1>Minio Cluster (TBD)</h1>
      <Yaml>{code}</Yaml>
    </>
  );
};
