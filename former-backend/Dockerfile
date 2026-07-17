FROM node:26-alpine AS test-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

USER node

RUN npm ci

RUN npm run lint

RUN npm run test

FROM node:26-alpine AS build-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN mkdir -p dist && chown node:node dist

USER node

RUN npm run build

FROM node:26-alpine AS serve-stage

WORKDIR /usr/src/app

COPY --from=build-stage --chown=node:node /usr/src/app/dist ./dist
COPY --from=build-stage --chown=node:node /usr/src/app/package*.json ./

RUN npm ci --omit=dev

USER node

CMD ["npm", "start"]