FROM node:12-alpine as web-client

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm uninstall -g @angular/cli
RUN npm install -g @angular/cli
RUN npm install
COPY . /app
RUN npm run build
FROM nginx:1.17.1-alpine
COPY --from=web-client /app/dist/web-client /usr/share/nginx/html
