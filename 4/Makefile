.SILENT:
help:
	echo
	echo "Nodevember Make Commands"
	echo
	echo "  Commands: "
	echo
	echo "    help - show this message"
	echo "    build - Build the Docker images that power local dev (docker)"
	echo "    clean - Remove docker containers"
	echo "    run - Start this service, and all of its deps, locally (docker)"
	echo "    test-integration - Run integration tests for this project"
	echo "    test-all - Run all tests for this project"
	echo "    deps - Check for all dependencies"

build: clean
	docker-compose -f ./run.yml build

run: build
	docker-compose -f ./run.yml up

build-test-integration: build
	docker-compose -f ./test.yml build

test-integration: clean
	docker-compose -f ./test.yml up

test-all: test-integration

clean:
	docker-compose -f ./run.yml rm -f
	docker-compose -f ./test.yml rm -f

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * docker-compose $(shell which docker-compose > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo

.PHONY: build build-test run build-test-integration test-integration test-all clean deps
