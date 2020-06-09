CPU_COUNT=2
DOCKER_ORG=dier

__IMAGE_TAG=$(DOCKER_ORG)/node:14.2.0

get-docker-iamge-tag:
	@echo $(__IMAGE_TAG)

build:
	docker build \
		--rm \
		--compress \
		--cpu-quota $(CPU_COUNT)00000 \
		-f $(shell pwd)/Dockerfile \
		-t $(__IMAGE_TAG) \
		$(shell pwd)
