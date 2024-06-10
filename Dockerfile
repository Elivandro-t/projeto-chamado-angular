FROM node:21-alpine as angular
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --silent
COPY . .
RUN npm run production

# Etapa de produção
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/projeto-cd116-frontend/browser /usr/share/nginx/html/
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
