# https://hub.docker.com/_/node
# https://hub.docker.com/_/alpine
# cpu_count=$(shell sysctl -n hw.physicalcpu)
cpu_count=2
image=localhost/node-14.2.0-alpine3.11
container_name=cv-jsnode-container
prefix=docker run -ti \
	--rm \
	--cpus $(cpu_count) \
	--memory 512m \
	--memory-swap 0 \
	--name $(container_name) \
	-v $(shell pwd):/app \
	-w /app
npm=$(prefix) --entrypoint npm $(image)
yarn=$(prefix) --entrypoint yarn $(image)
sh=$(prefix) --entrypoint sh $(image)
version-cmd=$(sh) -c '\
	echo -n "node : " && node --version && \
	echo -n "npm  : " && npm --version && \
	echo -n "npx  : " && npx --version && \
	echo -n "yarn : " && yarn --version && \
	git --version \
	'
deploy-cmd=$(prefix) \
	-v $(HOME)/.ssh/id_rsa:/root/.ssh/id_rsa \
	-v $(HOME)/.ssh/id_rsa.pub:/root/.ssh/id_rsa.pub \
	-v $(HOME)/.ssh/known_hosts:/root/.ssh/known_hosts \
	-v $(HOME)/.gitconfig:/root/.gitconfig \
	-v $(HOME)/.gitignore_global:/root/.gitignore_global \
	--entrypoint bash \
	$(image) \
	.docker-yarn-deploy.sh

build-docker:
	cd docker && make build

version:
	$(version-cmd)

install:
	$(yarn) install

add-%:
	$(yarn) add $*

test:
	$(yarn) test

build:
	$(yarn) build

run:
	$(prefix) -d -p 3000:3000 --entrypoint yarn $(image) start

stop:
	docker container stop $(container_name)

container:
	work_dir=$(shell pwd) && \
	cd docker/playground && \
	make run \
		cpu_count=$(cpu_count) \
		expose_port=3001 \
		work_dir=$$work_dir

start: run

deploy:
	$(deploy-cmd)
