FROM node:carbon-alpine

RUN mkdir /data

WORKDIR /data

COPY ./back .

RUN npm install -q

RUN node_modules/.bin/sequelize db:migrate
RUN node_modules/.bin/sequelize db:seed:all

EXPOSE 3000