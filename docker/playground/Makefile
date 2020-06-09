CPU_COUNT=2
DOCKER_ORG=dier

WORK_DIR=$(shell pwd)
EXPOSE_PORT=3000

__IMAGE_TAG=$(DOCKER_ORG)/playground-node:14.2.0

build:
	docker build \
		--rm \
		--force-rm \
		--compress \
		--cpu-quota $(CPU_COUNT)00000 \
		-f $(shell pwd)/Dockerfile \
		-t $(__IMAGE_TAG) \
		$(shell pwd)

run: build
	docker run -i -t \
		--rm \
		--cpus $(CPU_COUNT) \
		-p $(EXPOSE_PORT):$(EXPOSE_PORT) \
		-v $(WORK_DIR):/work_dir \
		-w /work_dir \
		$(__IMAGE_TAG)
