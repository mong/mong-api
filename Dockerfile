FROM node:16.6.1-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install && yarn run build

FROM node:16.6.1-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --only=production
COPY --from=builder /app/build ./build
EXPOSE 80
ENV NODE_ENV=production
ENV PORT=80
CMD ["node", "build"]
