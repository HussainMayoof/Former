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

RUN npx prisma generate

RUN npm run build

FROM node:26-alpine AS serve-stage

WORKDIR /usr/src/app

COPY --from=build-stage --chown=node:node /usr/src/app/dist ./dist

COPY --from=build-stage --chown=node:node /usr/src/app/package*.json ./

COPY --from=build-stage --chown=node:node /usr/src/app/prisma ./prisma

COPY --from=build-stage --chown=node:node /usr/src/app/prisma.config.ts ./

RUN npm ci --omit=dev

RUN npx prisma generate

USER node

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]