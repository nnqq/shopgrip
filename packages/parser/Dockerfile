FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY ./dist ./

CMD [ "node", "/usr/src/app/parser/server.js" ]
