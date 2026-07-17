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

FROM nginx:1.27-alpine AS serve-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]