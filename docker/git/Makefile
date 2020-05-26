node_version=14.2.0
image=localhost/node-$(node_version)-alpine3.11
build_cmd=docker build \
	--rm \
	--compress \
	-f $(shell pwd)/Dockerfile \
	-t $(image) \
	$(shell pwd)

build:
	$(build_cmd)
