FROM nginx:1.28

WORKDIR /usr/share/nginx/html

COPY dist/ .

EXPOSE 80