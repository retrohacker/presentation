FROM nodesource/node:4.2

EXPOSE 3000

CMD ["/watch.sh","node","app.js"]

ADD producer/package.json package.json
RUN npm install

ADD producer/ .

#CMD ["node","app.js"]

