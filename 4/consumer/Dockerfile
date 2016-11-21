FROM node:4

EXPOSE 3000

ADD consumer/package.json package.json
RUN npm install

ADD consumer/ .

CMD ["node","index.js"]
