FROM nginx

ENV TZ=Europe/Moscow

RUN mkdir /etc/nginx/sites-enabled && \
    ln -s /etc/nginx/sites-available/students-app.conf /etc/nginx/sites-enabled/ && \
    ln -s /etc/nginx/sites-available/students-client.conf /etc/nginx/sites-enabled/