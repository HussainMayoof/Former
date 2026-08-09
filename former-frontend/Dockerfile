FROM node:26-alpine AS types-stage
WORKDIR /usr/src/app/former-backend

#COPY --chown=node:node ./former-backend/package.json ./former-backend/package-lock.json ./
#
#COPY --chown=node:node ./former-backend/prisma ./prisma
#
#COPY --chown=node:node ./former-backend/src/schemas ./src/schemas

COPY --chown=node:node ./former-backend/ .

RUN npm ci

RUN npx prisma generate deploy

FROM node:26-alpine AS test-stage

WORKDIR /usr/src/app/former-frontend

COPY --chown=node:node ./former-frontend/ .

USER node

RUN npm ci

RUN npm run lint

RUN npm run test

FROM node:26-alpine AS build-stage

WORKDIR /usr/src/app

COPY --from=types-stage --chown=node:node /usr/src/app/former-backend/ ./former-backend/

WORKDIR /usr/src/app/former-frontend

COPY --chown=node:node ./former-frontend/ .

RUN mkdir -p dist && chown node:node dist

RUN chown -R node:node .

USER node

RUN npm ci

RUN npm run build

FROM nginx:1.27-alpine AS serve-stage

COPY --from=build-stage /usr/src/app/former-frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]