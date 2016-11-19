FROM node:6.9
MAINTAINER aabrook "aabrook@gmail.com"

RUN apt-get update && \
  apt-get install -y git python make g++ mysql-client

ENV APP_DIR=/usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

RUN npm i -g yarn
COPY yarn.lock package.json $APP_DIR/
RUN yarn

COPY . $APP_DIR

RUN yarn build

ENV PORT=1338
EXPOSE $PORT

CMD ["yarn", "start"]
