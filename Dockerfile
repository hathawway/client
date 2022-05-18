FROM nginx:1.19.0-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY /dist/agasu-frontend /usr/share/nginx/html

COPY ./certs/cert /etc/nginx/frontend.cert
COPY ./certs/key /etc/nginx/frontend.key

EXPOSE 443
EXPOSE 80

# start app
CMD ["nginx", "-g", "daemon off;"]
