FROM node:17.7.1-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install && yarn run build

FROM node:17.7.1-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --only=production && yarn cache clean
COPY --from=builder /app/build ./build
EXPOSE 80
ARG version="none"
ENV NODE_ENV=production
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
