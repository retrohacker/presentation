.SILENT:
help:
	echo
	echo "NodeSource Metrics Server Make commands"
	echo
	echo "  Commands: "
	echo
	echo "    help - show this message"
	echo "    build - Build the Docker images that power local dev (docker)"
	echo "    run - Start this service, and all of its deps, locally (docker)"
	echo "    deps - Check for all dependencies"

build:
	cd producer && docker build -t retrohacker/presentation:producer .

run: build
	docker run -it -p 3000:3000 retrohacker/presentation:producer

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo
