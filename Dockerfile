FROM node:17.1.0-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install && yarn run build

FROM node:17.1.0-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --only=production && yarn cache clean
COPY --from=builder /app/build ./build
EXPOSE 80
ENV NODE_ENV=production
ENV PORT=80
CMD ["node", "build"]
