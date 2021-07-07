FROM node:10-alpine as web-client

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=web-client /app/dist/web-client /usr/share/nginx/html