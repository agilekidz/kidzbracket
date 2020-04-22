FROM node:12

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/backend ./packages/backend

RUN yarn --production=false
RUN yarn --cwd packages/backend build
RUN yarn --production

EXPOSE 3000

CMD yarn --cwd packages/backend start
