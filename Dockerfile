FROM node:19.7.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN rm -rf dist/*
RUN npm run build

FROM nginx:1.23.2-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/front-ferme-du-beau-lieu/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
