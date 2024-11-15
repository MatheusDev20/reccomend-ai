FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

COPY apps/server/package.json ./apps/server/package.json
COPY apps/server/pnpm-lock.yaml ./apps/server/pnpm-lock.yaml

RUN npm install -g pnpm

RUN pnpm install

COPY . .