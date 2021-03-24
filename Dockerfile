FROM node:12.13-alpine as base

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/ .

FROM base as test
CMD [ "npm", "run", "test" ]

FROM base as prod
RUN npm install -g @nestjs/cli
RUN npm run build

CMD ["node", "dist/main"]