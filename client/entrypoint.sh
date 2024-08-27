#!/bin/sh

echo "Entrypoint: '$SERVER_API_URL'"

echo "window._env_ = {" > /usr/share/nginx/html/config.js
echo "  SERVER_API_URL: \"${SERVER_API_URL}\"" >> /usr/share/nginx/html/config.js
echo "}" >> /usr/share/nginx/html/config.js

exec "$@"
