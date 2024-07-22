FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./client/nginx.conf /etc/nginx/conf.d
COPY ./client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
