FROM node:26-alpine AS types-stage
WORKDIR /usr/src/app/former-backend

COPY --chown=node:node ./former-backend/package.json ./former-backend/package-lock.json ./

COPY --chown=node:node ./former-backend/prisma ./prisma

COPY --chown=node:node ./former-backend/src/schemas ./src/schemas

RUN npm ci

RUN npx prisma generate deploy

FROM node:26-alpine AS build-stage

WORKDIR /usr/src/app

COPY --from=types-stage --chown=node:node /usr/src/app/former-backend/ ./former-backend/

WORKDIR /usr/src/app/former-frontend

COPY --chown=node:node ./former-frontend/ .

RUN mkdir -p dist && chown node:node dist

RUN chown -R node:node .

USER node

RUN npm ci

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:1.27-alpine AS serve-stage

COPY --from=build-stage /usr/src/app/former-frontend/dist /usr/share/nginx/html

COPY ./former-frontend/nginx.conf /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]