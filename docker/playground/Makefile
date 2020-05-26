cpu_count=2
node_version=14.2.0
image=localhost/playground-node-$(node_version)-alpine3.11
work_dir=$(shell pwd)
expose_port=3000
build_cmd=docker build \
	--rm \
	--compress \
	-f $(shell pwd)/Dockerfile \
	-t $(image) \
	$(shell pwd)
run_cmd=docker run --rm -it \
	--cpus $(cpu_count) \
	-p $(expose_port):$(expose_port) \
	-v $(work_dir):/work_dir \
	-w /work_dir \
	$(image)

build:
	$(build_cmd)

run: build
	$(run_cmd)