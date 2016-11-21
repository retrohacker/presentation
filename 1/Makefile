.SILENT:
help:
	echo
	echo "NodeSource Metrics Server Make commands"
	echo
	echo "  Commands: "
	echo
	echo "    help - show this message"
	echo "    run - Start this service, and all of its deps, locally (docker)"
	echo "    test-producer - Run the unit tests for producer"
	echo "    deps - Check for all dependencies"

build:
	docker build -t retrohacker/presentation:producer ./producer/

build-test: build
	docker build -t retrohacker/presentation:producer-test -f ./producer/Test.Dockerfile ./producer/

run: build
	docker run -it -p 3000:3000 retrohacker/presentation:producer

test-producer: build-test
	docker run -it -p 3000:3000 retrohacker/presentation:producer-test

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo
