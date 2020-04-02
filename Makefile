# versions
node_version=13.12.0
alpine_version=3.11

# images names
image=node:$(node_version)-buster
alpine_image=node:$(node_version)-alpine$(alpine_version)

# global prefix
prefix=docker run -ti --rm -v $(shell pwd):/app -w /app

# tools
npm=$(prefix) --entrypoint npm $(alpine_image)
yarn=$(prefix) --entrypoint yarn $(alpine_image)

version:
	$(prefix) \
		--entrypoint sh \
		$(alpine_image) -c '\
			echo "node version:" && node --version && \
			echo "npm version:" && npm --version && \
			echo "npx version:" && npx --version && \
			echo "yarn version:" && yarn --version \
			'

npm-install:
	$(npm) install

npm-update:
	$(npm) update

npm-upgrade:
	$(npm) upgrade

npm-version:
	$(npm) version

yarn-install:
	$(yarn) install

yarn-upgrade:
	$(yarn) upgrade

yarn-test:
	$(yarn) test

install: yarn-install

upgrade: yarn-upgrade

run:
	$(prefix) -p 3000:3000 --entrypoint yarn $(alpine_image) start

start: run

deploy:
	$(prefix) \
		-v $(HOME)/.ssh:/root/.ssh \
		-v $(HOME)/.gitconfig:/root/.gitconfig \
		-v $(HOME)/.gitignore_global:/root/.gitignore_global \
		--entrypoint bash \
		$(image) .docker-yarn-deploy.sh
