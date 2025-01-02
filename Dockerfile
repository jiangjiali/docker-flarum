FROM amd64/alpine:3.20

ENV GID=991 \
    UID=991 \
    UPLOAD_MAX_SIZE=20M \
    PHP_MEMORY_LIMIT=128M \
    OPCACHE_MEMORY_LIMIT=128 \
    DB_HOST=DBHOST \
    DB_USER=DBUSER \
    DB_NAME=DBNAME \
    DB_PASS=DBPASS \
    DB_PORT=DBPORT \
    DB_PREF=flarum_ \
    FLARUM_TITLE=知之简史 \
    FORUM_URL=https://www.jiangjiali.com \
    DEBUG=false \
    LOG_TO_STDOUT=false \
    GITHUB_TOKEN_AUTH=false \
    FLARUM_PORT=8888 \
    FLARUM_ADMIN_USER=FLARUMADMINUSER \
    FLARUM_ADMIN_PASS=FLARUMADMINPASS \
    FLARUM_ADMIN_MAIL=FLARUMADMINMAIL \
    FLARUM_TITLE=知之简史

RUN set -x \
    && apk add --no-progress --no-cache \
    curl \
    icu-data-full \
    libcap \
    redis \
    nginx \
    composer \
    php82 \
    php82-ctype \
    php82-curl \
    php82-dom \
    php82-exif \
    php82-fileinfo \
    php82-fpm \
    php82-gd \
    php82-gmp \
    php82-iconv \
    php82-intl \
    php82-mbstring \
    php82-mysqlnd \
    php82-opcache \
    php82-pecl-apcu \
    php82-pecl-redis \
    php82-openssl \
    php82-pdo \
    php82-pdo_mysql \
    php82-phar \
    php82-session \
    php82-tokenizer \
    php82-xmlwriter \
    php82-zip \
    php82-zlib \
    su-exec \
    tzdata \
    s6 \
  && echo "Asia/Shanghai" > /etc/timezone \
  && sed -i 's/memory_limit = .*/memory_limit = ${PHP_MEMORY_LIMIT}/' /etc/php82/php.ini \
  && mkdir -p /run/php /flarum/app /flarum/redis \
  && composer config -g repos.packagist composer https://mirrors.tencent.com/composer/ \
  && setcap CAP_NET_BIND_SERVICE=+eip /usr/sbin/nginx

COPY rootfs /
RUN chmod +x /usr/local/bin/* /etc/s6.d/*/run /etc/s6.d/.s6-svscan/*

VOLUME /etc/nginx/flarum /flarum/app/extensions /flarum/app/public/assets /flarum/app/storage/logs
EXPOSE ${FLARUM_PORT}
CMD ["/usr/local/bin/startup"]
