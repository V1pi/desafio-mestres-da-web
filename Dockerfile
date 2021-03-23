FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install --only=production

COPY ./backend/ .

RUN npm install -g @nestjs/cli
RUN npm run build

CMD ["node", "dist/main"]