FROM node:12 as builder

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/frontend ./packages/frontend
COPY packages/backend ./packages/backend

RUN yarn --production=false
RUN yarn --cwd packages/frontend build:check
RUN yarn --cwd packages/frontend build

FROM nginx:1.17.9

COPY --from=builder /usr/src/app/packages/frontend/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
