FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
COPY angular.json /usr/src/app/angular.json
COPY tsconfig*.json ./
COPY proxy.conf.json /usr/src/app/proxy.conf.json

RUN npm install --force
RUN npm install -g @angular/cli@14.2.6
