FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./client/nginx.conf /etc/nginx/conf.d
COPY ./client/build /usr/share/nginx/html

RUN #sed -i 's|\${API_BASE_URL}|'"kek"'|g' /etc/nginx/conf.d/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
