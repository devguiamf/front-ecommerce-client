FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install -f
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/front_ecommerce_client/browser /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf