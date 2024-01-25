FROM node:16-bullseye-slim

COPY build /profileportal/build
COPY package.json /profileportal/package.json
COPY babel.config.json /profileportal/babel.config.json
COPY .env.development /profileportal/.env.development

WORKDIR /profileportal

RUN npm install
RUN echo $(ls)

EXPOSE 3000
CMD [ "npm", "start" ]
