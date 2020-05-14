FROM node:12 as builder

WORKDIR /usr/src/app

ENV NODE_ENV=production

ARG GRAPHQL_API_ENDPOINT
ENV GRAPHQL_API_ENDPOINT $GRAPHQL_API_ENDPOINT

ARG GITHUB_OAUTH2_CLIENT_ID
ENV GITHUB_OAUTH2_CLIENT_ID $GITHUB_OAUTH2_CLIENT_ID

ARG GOOGLE_OAUTH2_CLIENT_ID
ENV GOOGLE_OAUTH2_CLIENT_ID $GOOGLE_OAUTH2_CLIENT_ID

ARG GOOGLE_OAUTH2_REDIRECT_URI
ENV GOOGLE_OAUTH2_REDIRECT_URI $GOOGLE_OAUTH2_REDIRECT_URI

RUN echo $GRAPHQL_API_ENDPOINT
RUN echo $GITHUB_OAUTH2_CLIENT_ID
RUN echo $GOOGLE_OAUTH2_CLIENT_ID
RUN echo $GOOGLE_OAUTH2_REDIRECT_URI

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/frontend ./packages/frontend
COPY packages/backend ./packages/backend

RUN yarn --production=false
RUN yarn --cwd packages/frontend build:check
RUN yarn --cwd packages/frontend build

FROM nginx:1.17.9

COPY --from=builder /usr/src/app/packages/frontend/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY packages/frontend/nginx.conf /etc/nginx/conf.d
