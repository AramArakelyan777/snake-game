FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .

ENV TERM xterm-256color

CMD ["node", "index.js"]
