FROM node:12.13-alpine as base


FROM base as backend
WORKDIR /usr/src/backend

COPY ./backend/ .

RUN npm install

FROM backend as test
CMD [ "npm", "run", "test" ]

FROM backend as prod_backend
RUN npm install -g @nestjs/cli
RUN npm run build

CMD ["node", "dist/main"]

FROM base as frontend
WORKDIR /usr/src/frontend

COPY ./frontend/ .

RUN npm install
RUN npm install -g serve

RUN npm run build
 
CMD ["serve", "-s", "build"]