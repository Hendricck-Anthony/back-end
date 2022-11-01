FROM node:16.14.0-alpine

WORKDIR /usr/app

COPY package-lock.json ./
COPY package.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["npm","run","start:prod"]