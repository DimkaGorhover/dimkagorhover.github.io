---
title: "Minio Cluster"
date: 2021-03-01
draft: true
tags: ["minio", "docker", "s3"]
---

<!-- TODO: write the description -->

## Links

- [Minio: Home Page](https://min.io/)
- [Github: minio/minio](https://github.com/minio/minio)
- [MinIO Docker Quickstart Guide](https://docs.min.io/docs/minio-docker-quickstart-guide)
- [MinIo для самых маленьких](https://habr.com/ru/company/veeam/blog/517392/)
- [Deploy MinIO on Docker Compose](https://docs.min.io/docs/deploy-minio-on-docker-compose.html)

## Code

`docker-compose.yml`:

```yaml
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
      MINIO_ACCESS_KEY: ${S3_ACCESS_KEY}
      MINIO_SECRET_KEY: ${S3_SECRET_KEY}
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
```

`.env`:

```properties
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
```

`nginx.conf`:

```nginx
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
```

`healthcheck.sh`:

```sh
#!/bin/sh
set -eo pipefail

curl -fsSL localhost:9000/minio/health/live -o /dev/null
curl -fsSL localhost:9000/minio/health/cluster -o /dev/null
curl -fsSL minio:9000/minio/health/live -o /dev/null
curl -fsSL minio:9000/minio/health/cluster -o /dev/null
```
