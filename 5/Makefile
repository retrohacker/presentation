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
	echo "    provision-cluster - Provision a remote kubernetes cluster"
	echo "    delete-cluster - Remove a remote kubernetes cluster"
	echo "    deps - Check for all dependencies"

build: clean
	docker-compose build
	docker tag 5_consumer gcr.io/nodesource-bacu/consumer:latest
	docker tag 5_producer gcr.io/nodesource-bacu/producer:latest
	docker tag 5_nginx gcr.io/nodesource-bacu/nginx:latest

run: build
	docker-compose up

clean:
	docker-compose rm -f

clean-deploy: clean
	gcloud config set project nodesource-bacu
	gcloud container clusters get-credentials presentation
	kubectl delete -f kube.yml || true

deploy: clean-deploy build
	gcloud config set project nodesource-bacu
	gcloud docker push gcr.io/nodesource-bacu/consumer:latest
	gcloud docker push gcr.io/nodesource-bacu/producer:latest
	gcloud docker push gcr.io/nodesource-bacu/nginx:latest
	gcloud container clusters get-credentials presentation
	kubectl create -f kube.yml
	kubectl get services

provision-cluster:
	gcloud config set project nodesource-bacu
	gcloud container clusters create presentation

delete-cluster:
	gcloud config set project nodesource-bacu
	gcloud container clusters delete presentation -q

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
