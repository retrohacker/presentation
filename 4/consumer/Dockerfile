FROM nodesource/node:4.2

EXPOSE 3000

ADD consumer/package.json package.json
RUN npm install

ADD consumer/ .

CMD ["node","app.js"]
