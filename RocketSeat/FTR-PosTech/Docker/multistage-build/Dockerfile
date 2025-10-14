FROM node:23.11.1 AS base

WORKDIR /usr/src/app

COPY ../upload-server-web/package.json ../upload-server-web/package-lock.json ./

FROM base AS dependencies

WORKDIR /usr/src/app

COPY ../upload-server-web .

RUN npm install

FROM base AS build

WORKDIR /usr/src/app

COPY ../upload-server-web .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm build
RUN npm prune --prod

FROM node:23.11.1-alpine3.22 AS runner

WORKDIR /usr/src/app

USER 1000

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node-modules ./node-modules
COPY --from=build /usr/src/app/package.json ./package.json

ENV PORT=3333
ENV NODE_ENV=development

# Database
ENV DATABASE_URL="postgresql://docker:docker@localhost:5432/upload"

# Cloudflare
ENV CLOUDFLARE_ACCOUNT_ID=359c00707151ca0da42812c3a39add61
ENV CLOUDFLARE_TOKEN_VALUE=YDRR2tEjOAPKVnTzYvAYJv_Bc6CcnYLnqurh1s0S
ENV CLOUDFLARE_BUCKET=ftr-upload-server
ENV CLOUDFLARE_PUBLIC_URL=https://pub-8507ca94f50943a89f0164b469fec8ca.r2.dev

# S3 
ENV AWS_ACCESS_KEY_ID=4ac1bb7daa5a0d42333663529dfd445d
ENV AWS_ACCESS_KEY_SECRET=75cd99d636d77a793218dcced9596512a17eed1f88930d7dda6e3f2189661b35

ENV SPECIFIC_ENDPOINT=https://359c00707151ca0da42812c3a39add61.r2.cloudflarestorage.com

EXPOSE 3333

CMD ["node", "dist/infra/http/server.js"]