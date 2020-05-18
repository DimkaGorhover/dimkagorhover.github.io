# https://hub.docker.com/_/node
# https://hub.docker.com/_/alpine
image=localhost/node-14.2.0-alpine3.11
prefix=docker run -ti \
	--rm \
	--name cv-jsnode-container \
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
	-v $(HOME)/.ssh:/root/.ssh \
	-v $(HOME)/.gitconfig:/root/.gitconfig \
	-v $(HOME)/.gitignore_global:/root/.gitignore_global \
	--entrypoint bash \
	$(image) .docker-yarn-deploy.sh

build-docker:
	cd docker && make build

version:
	$(version-cmd)

npm-install:
	$(npm) install

npm-install-%:
	$(npm) install $*

npm-update:
	$(npm) update

npm-upgrade:
	$(npm) upgrade

yarn-install:
	$(yarn) install

yarn-upgrade:
	$(yarn) upgrade

yarn-test:
	$(yarn) test

install: yarn-install

upgrade: yarn-upgrade

run:
	$(prefix) -p 3000:3000 --entrypoint yarn $(image) start

start: run

deploy:
	$(deploy-cmd)
