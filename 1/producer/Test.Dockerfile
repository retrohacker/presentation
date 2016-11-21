FROM retrohacker/presentation:producer

ENV NODE_ENV dev
RUN npm install

CMD ["npm", "test"]
