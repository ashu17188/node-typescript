### STAGE 1: Build ###
FROM node:14.8.0-alpine AS build

LABEL maintainer Ashutosh Shukla <ashu17188@gmail.com>

RUN apk --update add git

ENV NPM_CONFIG_LOGLEVEL info
##ENV NODE_ENV production
ENV MONGODB_URI=mongodb://db:27017/admin
##ENV JWT_SECRET ashdfjhasdlkjfhalksdjhflak
##ENV SALT_SECRET 8

WORKDIR /usr/src/app
COPY package.json ./

COPY . .
RUN npm install

EXPOSE 3000
#CMD [ "npm", "start" ]
CMD [ "node", "dist/server.js" ]