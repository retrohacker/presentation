FROM node:4

WORKDIR /usr/src/app

ENV NODE_ENV dev

ADD package.json ./
RUN npm install
ADD * ./

CMD ["npm", "test"]
