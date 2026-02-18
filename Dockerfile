FROM nginx:stable-alpine

# WORKDIR /usr/share/nginx/html

COPY ./dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./config/nginx.conf /etc/nginx/conf.d/nginx.conf