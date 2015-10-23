FROM nodesource/node:4.2

#####################
# LOCAL DEVELOPMENT #
#####################
ADD watch.sh /watch.sh

RUN apt-get update \
 && apt-get install -y --force-yes --no-install-recommends\
      inotify-tools \
 && rm -rf /var/lib/apt/lists/*;


CMD ["/watch.sh","node","app.js"]

EXPOSE 3000

ADD consumer/package.json package.json
RUN npm install

ADD consumer/ .

#CMD ["node","app.js"]
