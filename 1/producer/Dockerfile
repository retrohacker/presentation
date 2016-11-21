FROM node:4

EXPOSE 3000

ENV NODE_ENV production
ADD producer/package.json package.json
RUN npm install

ADD producer/ .

CMD ["node","index.js"]
