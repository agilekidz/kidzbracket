FROM node:12 as builder

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/frontend ./packages/frontend

RUN yarn --production=false
RUN yarn --cwd packages/frontend build

FROM nginx:1.17.9

COPY --from=builder /usr/src/app/packages/frontend/dist /usr/share/nginx/html
