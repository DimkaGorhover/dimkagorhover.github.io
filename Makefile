node_version=13.12.0
alpine_version=3.11
node_image=node:$(node_version)-alpine$(alpine_version)

prefix=docker run -ti --rm \
	-v $(shell pwd):/app \
	-w /app

sh=$(prefix) --entrypoint sh $(node_image)

node=$(prefix) -p 3000:3000 --entrypoint node $(node_image)
npm=$(prefix) -p 3000:3000 --entrypoint npm $(node_image)
npx=$(prefix) -p 3000:3000 --entrypoint npx $(node_image)

version:
	$(sh) -c '\
		echo "node version:" && node --version && \
		echo "npm version:" && npm --version && \
		echo "npx version:" && npx --version && \
		echo "yarn version:" && yarn --version \
		'

install-deps:
	$(npm) install

npm-update:
	$(npm) update

npm-upgrade:
	$(npm) upgrade

upgrade:
	$(prefix) --entrypoint yarn $(node_image) install

run:
	$(prefix) -p 3000:3000 --entrypoint yarn $(node_image) start

start: run

deploy:
	$(prefix) \
		-v $(HOME)/.ssh:/root/.ssh \
		-v $(HOME)/.gitconfig:/root/.gitconfig \
		-v $(HOME)/.gitignore_global:/root/.gitignore_global \
		--entrypoint yarn \
		node:$(node_version) deploy
