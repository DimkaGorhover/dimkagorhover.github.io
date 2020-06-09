CPU_COUNT=2
DOCKER_ORG=dier

build: __build_git __build_playground
	@echo 'done'

__build_git:
	cd $(shell pwd)/git && \
	make build \
		CPU_COUNT=$(CPU_COUNT) \
		DOCKER_ORG=$(DOCKER_ORG)

__build_playground:
	cd $(shell pwd)/playground && \
	make build \
		CPU_COUNT=$(CPU_COUNT) \
		DOCKER_ORG=$(DOCKER_ORG)
