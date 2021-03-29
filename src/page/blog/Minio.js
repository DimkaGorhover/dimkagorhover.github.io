import { useTitle } from '../../common';
import { Properties, Shell, Yaml } from '../../components/code';
import { Tab, Tabs } from 'react-bootstrap';
import { BlankLink } from '../../components/common/BlankLink';

const dockerComposeCode = `
version: "3.8"

networks:
  app_net:
    name: s3_app_net
    external: no
    attachable: yes

volumes:
  minio0_data: { driver: local }
  minio1_data: { driver: local }
  minio2_data: { driver: local }
  minio3_data: { driver: local }

services:
  minio0: &minio
    image: minio/minio:latest
    restart: always
    command: server http://minio{0...3}:9000/data/data{0...3}
    cpu_quota: 50000
    mem_limit: 512m
    mem_reservation: 256m
    mem_swappiness: 0
    memswap_limit: 0
    healthcheck:
      test: sh /healthcheck
      start_period: 5s
      interval: 5s
      timeout: 1s
      retries: 5
    networks:
      app_net:
        aliases:
          - s3
          - minio 
    expose:
      - 9000
    environment:
      MINIO_PROMETHEUS_AUTH_TYPE: public
      MINIO_ACCESS_KEY: \${S3_ACCESS_KEY}
      MINIO_SECRET_KEY: \${S3_SECRET_KEY}
    volumes:
      - ./healthcheck.sh:/healthcheck:ro
      - minio0_data:/data

  minio1:
    <<: *minio
    volumes:
      - ./healthcheck.sh:/healthcheck:ro
      - minio1_data:/data

  minio2:
    <<: *minio
    volumes:
      - ./healthcheck.sh:/healthcheck:ro
      - minio2_data:/data

  minio3:
    <<: *minio
    volumes:
      - ./healthcheck.sh:/healthcheck:ro
      - minio3_data:/data

  nginx:
    image: nginx:1.19.8-alpine
    restart: always
    cpu_quota: 50000
    mem_reservation: 32m
    mem_limit: 32m
    mem_swappiness: 0
    memswap_limit: 0
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./healthcheck.sh:/healthcheck:ro
    ports:
      - 9000:9000
    networks:
      app_net:
        aliases:
          - nginx
    healthcheck:
      test: sh /healthcheck
      start_period: 5s
      interval: 5s
      timeout: 1s
      retries: 5
    depends_on:
      minio0: { condition: service_healthy }
      minio1: { condition: service_healthy }
      minio2: { condition: service_healthy }
      minio3: { condition: service_healthy }

`.trim();

const healthcheckCode = `
#!/bin/sh
set -eo pipefail

curl -fsSL localhost:9000/minio/health/live -o /dev/null
curl -fsSL localhost:9000/minio/health/cluster -o /dev/null
curl -fsSL minio:9000/minio/health/live -o /dev/null
curl -fsSL minio:9000/minio/health/cluster -o /dev/null
`.trim();

const dotEnvCode = `
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
`.trim();

const nginxConfCode = `

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;

    upstream minio {
        server minio:9000;
        # server minio0:9000;
        # server minio1:9000;
        # server minio2:9000;
        # server minio3:9000;
    }

    server {
        listen       9000;
        listen  [::]:9000;
        server_name  localhost;

         # To allow special characters in headers
         ignore_invalid_headers off;
         # Allow any size file to be uploaded.
         # Set to a value such as 1000m; to restrict file size to a specific value
         client_max_body_size 0;
         # To disable buffering
         proxy_buffering off;

        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_connect_timeout 300;
            # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
            proxy_http_version 1.1;
            proxy_set_header Connection "";
            chunked_transfer_encoding off;

            proxy_pass http://minio;
        }
    }
}

`.trim();

const Links = () => {

  const links = [
    {
      name: 'Minio: Home Page',
      href: 'https://min.io/',
    },
    {
      name: 'Github: minio/minio',
      href: 'https://github.com/minio/minio',
    },
    {
      name: 'MinIO Docker Quickstart Guide',
      href: 'https://docs.min.io/docs/minio-docker-quickstart-guide',
    },
    {
      name: 'MinIo для самых маленьких',
      href: 'https://habr.com/ru/company/veeam/blog/517392/',
    },
    {
      name: 'Deploy MinIO on Docker Compose',
      href: 'https://docs.min.io/docs/deploy-minio-on-docker-compose.html',
    },
  ];

  return (
    <ul>
      {links.map((link, idx) => {
        return (
          <li key={idx}>
            <BlankLink {...link} />
          </li>
        );
      })}
    </ul>
  );
};

export const Minio = () => {
  useTitle('Blog: Minio Cluster');

  return (
    <>
      <h1>Minio Cluster</h1>

      <h3>Description</h3>
      <section>
        <p>
          TBD
        </p>
      </section>

      <h3>Links</h3>
      <section>
        <Links />
      </section>

      <h3>Code</h3>

      <Tabs defaultActiveKey={'dc'}>
        <Tab title={'docker-compose.yml'} eventKey={'dc'}>
          <Yaml>{dockerComposeCode}</Yaml>
        </Tab>
        <Tab title={'.env'} eventKey={'env'}>
          <Properties>{dotEnvCode}</Properties>
        </Tab>
        <Tab title={'nginx.conf'} eventKey={'nginx'}>
          <Shell>{nginxConfCode}</Shell>
        </Tab>
        <Tab title={'healthcheck.sh'} eventKey={'healthcheck'}>
          <Shell>{healthcheckCode}</Shell>
        </Tab>
      </Tabs>

    </>
  );
};
