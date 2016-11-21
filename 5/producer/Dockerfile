FROM node:4

ADD producer/package.json package.json
RUN npm install

ADD producer/ .

CMD ["node","index.js"]
