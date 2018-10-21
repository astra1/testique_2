FROM node:carbon-alpine

RUN mkdir /data

WORKDIR /data

COPY ./front .

RUN npm install -q

EXPOSE 80