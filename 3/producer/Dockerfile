FROM nodesource/node:4.2

EXPOSE 3000

ADD producer/package.json package.json
RUN npm install

ADD producer/ .

CMD ["node","app.js"]
