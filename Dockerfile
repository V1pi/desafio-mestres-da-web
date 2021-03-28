FROM node:12.13-alpine as base


FROM base as backend
WORKDIR /usr/src/backend

COPY ./backend/ .

RUN npm install

FROM backend as test
CMD [ "npm", "run", "test" ]

FROM backend as prod_backend
RUN npm run build

CMD ["node", "dist/index.js"]

FROM base as frontend
WORKDIR /usr/src/frontend

COPY ./frontend/ .

RUN npm install
RUN npm install -g serve

RUN npm run build
 
CMD ["serve", "-s", "build"]