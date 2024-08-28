FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./client/entrypoint.sh /entrypoint.sh
COPY ./client/nginx.conf /etc/nginx/conf.d
COPY ./client/build /usr/share/nginx/html

EXPOSE 80

CMD ["/entrypoint.sh", "nginx", "-g", "daemon off;"]
