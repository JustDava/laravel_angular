FROM php:8.3-fpm

ENV TZ=Europe/Moscow

RUN apt update && \
    apt -y --no-install-recommends install libonig-dev libxml2-dev zlib1g-dev libzip-dev libcurl4-openssl-dev && \
    docker-php-ext-install mysqli bcmath mbstring xml ctype zip pdo_mysql curl filter && \
    apt-get install nodejs npm -y

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer;