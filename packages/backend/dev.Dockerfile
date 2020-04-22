FROM node:12

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package.json yarn.lock .eslintrc.js .prettierrc.js tsconfig.base.json ./

EXPOSE 3000

CMD yarn && yarn --cwd packages/backend dev
