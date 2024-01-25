FROM node:16-bullseye-slim

COPY ./package.json /profileportal/package.json
COPY ./build /profileportal
COPY ./babel.config.json /profileportal/babel.config.json
COPY .env.server /profileportal/.env.server

WORKDIR /profileportal

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]