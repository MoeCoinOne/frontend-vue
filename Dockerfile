FROM node:8.11.3
LABEL maintainer="smilec@moecoin.one"

RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.7.12-1~wheezy

RUN apt update && \
    apt install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 80
COPY . /app
WORKDIR /app
RUN npm i
RUN npm run build
RUN cp -R /app/dist/*  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]