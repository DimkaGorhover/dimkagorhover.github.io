# https://hub.docker.com/_/node
# https://hub.docker.com/_/alpine
# CPU_COUNT=$(shell sysctl -n hw.physicalcpu)
CPU_COUNT=2
DOCKER_ORG=dier
CONTAINER_NAME=nodejs-$(shell basename "$$PWD")

__IMAGE_TAG=$(shell make --makefile docker/git/Makefile get-docker-iamge-tag)

__DOCKER_PREFIX=docker run -ti \
	--rm \
	--cpus $(CPU_COUNT) \
	--memory 1g \
	--memory-swap 0 \
	--name $(CONTAINER_NAME) \
	-v $(shell pwd):/app \
	-w /app

yarn=$(__DOCKER_PREFIX) --entrypoint yarn $(__IMAGE_TAG)

__build_docker:
	cd docker && \
	make build \
		CPU_COUNT=$(CPU_COUNT) \
		DOCKER_ORG=$(DOCKER_ORG)

version:
	$(__DOCKER_PREFIX) \
	--entrypoint sh \
	$(__IMAGE_TAG) -c '\
		echo -n "node : " && node --version && \
		echo -n "npm  : " && npm --version && \
		echo -n "npx  : " && npx --version && \
		echo -n "yarn : " && yarn --version && \
		git --version \
		'

install:
	$(yarn) install

add-%:
	$(yarn) add $*

# add:
# 	$(yarn) remove @material-ui/core @material-ui/icons

remove-%:
	$(yarn) remove $*

run: __build_docker
	$(__DOCKER_PREFIX) \
		-p 3000:3000 \
		--entrypoint yarn \
		$(__IMAGE_TAG) \
		start

rund: __build_docker
	$(__DOCKER_PREFIX) \
		-d \
		-p 3000:3000 \
		--entrypoint yarn \
		$(__IMAGE_TAG) \
		start

yarn-container:
	cd docker/playground && \
	make run \
		CPU_COUNT=$(CPU_COUNT) \
		DOCKER_ORG=$(DOCKER_ORG) \
		EXPOSE_PORT=3000 \
		WORK_DIR=$(shell pwd)

deploy:
	$(__DOCKER_PREFIX) \
		-v $(HOME)/.ssh/id_rsa:/root/.ssh/id_rsa \
		-v $(HOME)/.ssh/id_rsa.pub:/root/.ssh/id_rsa.pub \
		-v $(HOME)/.ssh/known_hosts:/root/.ssh/known_hosts \
		-v $(HOME)/.gitconfig:/root/.gitconfig \
		-v $(HOME)/.gitignore_global:/root/.gitignore_global \
		--entrypoint bash \
		$(__IMAGE_TAG) \
		$(shell pwd)/.control/yarn-deploy.sh
