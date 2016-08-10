.SILENT:
help:
	echo
	echo "NodeSource Metrics Server Make commands"
	echo
	echo "  Commands: "
	echo
	echo "    help - show this message"
	echo "    build - Build the Docker images that power local dev (docker)"
	echo "    clean - Remove docker containers"
	echo "    run - Start this service, and all of its deps, locally (docker)"
	echo "    deploy - Deploy this app to Google Cloud (kubernetes)"
	echo "    deploy-nsolid - Setup N|Solid dashboard (kubernetes)"
	echo "    deps - Check for all dependencies"

build: clean
	docker-compose build
	docker tag 6_consumer gcr.io/nodesource-bacu/consumer:latest
	docker tag 6_producer gcr.io/nodesource-bacu/producer:latest
	docker tag 6_nginx gcr.io/nodesource-bacu/nginx:latest

run: build
	docker-compose up

clean:
	docker-compose rm -f

clean-deploy: clean
	kubectl delete -f kube.yml || true

deploy: clean-deploy build
	gcloud docker push gcr.io/nodesource-bacu/consumer:latest
	gcloud docker push gcr.io/nodesource-bacu/producer:latest
	gcloud docker push gcr.io/nodesource-bacu/nginx:latest
	kubectl create -f kube.yml
	kubectl get services

deploy-nsolid:
	kubectl create -f ./nsolid/nsolid.everything.yml

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * docker-compose $(shell which docker-compose > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * gcloud $(shell which gcloud > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * kubectl $(shell which kubectl > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo
