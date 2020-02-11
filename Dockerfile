FROM node:alpine

MAINTAINER "Maurício Pádua"

WORKDIR /usr/jwt

COPY . .

RUN echo "Install Yarn"
RUN npm install yarn

RUN yarn install

EXPOSE ${PORT}

CMD [ "yarn", "start" ]