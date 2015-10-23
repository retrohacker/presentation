FROM nodesource/node:4.2

#####################
# LOCAL DEVELOPMENT #
#####################
ADD watch.sh /watch.sh

RUN apt-get update \
 && apt-get install -y --force-yes --no-install-recommends\
      inotify-tools \
 && rm -rf /var/lib/apt/lists/*;

EXPOSE 3000

CMD ["/watch.sh","node","app.js"]

ADD producer/package.json package.json
RUN npm install

ADD producer/ .

#CMD ["node","app.js"]

