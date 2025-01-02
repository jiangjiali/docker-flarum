## 使用腾讯镜像时，修改
```
RUN set -x \
    && echo "https://mirrors.cloud.tencent.com/alpine/v3.20/main/" > /etc/apk/repositories \
    && echo "https://mirrors.cloud.tencent.com/alpine/v3.20/community/" >> /etc/apk/repositories \
```

## 环境
choco install php --version=8.2.20
choco install composer --version=6.3.0

更新版本 
choco upgrade php --version=8.2.20

* php.ini 修改配置，必须要打开
> extension=pdo_mysql
> extension=fileinfo
> extension=gd

### Features

- platform image: `linux/amd64`
- Lightweight & secure image
- Based on Alpine Linux 3.20
- **nginx** and **PHP 8.2**
- Latest [Flarum Framework](https://github.com/flarum/framework) (v1.8.3)
- MySQL/Mariadb driver
- OPCache extension configured

### Build-time variables

- **VERSION** = Version of [flarum/flarum](https://github.com/flarum/flarum) skeleton (default: *v1.8.3*)

### Ports

- Default: **8888** (configurable)

### Volume

- **/flarum/app/extensions** : Flarum extension directory
- **/flarum/app/public/assets** : Flarum assets directory
- **/flarum/app/storage/logs** : Flarum logs directory
- **/etc/nginx/flarum** : Nginx location directory

### Environment variables

| Variable | Description | Type | Default value |
| -------- | ----------- | ---- | ------------- |
| **UID** | Flarum user id | *optional* | 991
| **GID** | Flarum group id | *optional* | 991
| **DEBUG** | Flarum debug mode | *optional* | false
| **FORUM_URL** | Forum URL | **required** | none
| **DB_HOST** | MariaDB instance ip/hostname | *optional* | mariadb
| **DB_USER** | MariaDB database username | *optional* | flarum
| **DB_NAME** | MariaDB database name | *optional* | flarum
| **DB_PASS** | MariaDB database password | **required** | none
| **DB_PREF** | Flarum tables prefix | *optional* | none
| **DB_PORT** | MariaDB database port | *optional* | 3306
| **FLARUM_PORT** | Port to run Flarum on inside the container | *optional* | 8888
| **UPLOAD_MAX_SIZE** | The maximum size of an uploaded file | *optional* | 50M
| **PHP_MEMORY_LIMIT** | PHP memory limit | *optional* | 128M |
| **OPCACHE_MEMORY_LIMIT** | OPcache memory size in megabytes | *optional* | 128
| **LOG_TO_STDOUT** | Enable nginx and php error logs to stdout | *optional* | false
| **GITHUB_TOKEN_AUTH** | Github token to download private extensions | *optional* | false
| **PHP_EXTENSIONS** | Install additional php extensions | *optional* | none

### Required environment variable for first installation

| Variable | Description | Type | Default value |
| -------- | ----------- | ---- | ------------- |
| **FLARUM_ADMIN_USER** | Name of your user admin | **required** | none
| **FLARUM_ADMIN_PASS** | User admin password | **required** | none
| **FLARUM_ADMIN_MAIL** | User admin adress mail | **required** | none
| **FLARUM_TITLE** | Set a name of your flarum | *optional* | Docker-Flarum

## Installation

#### 1 - Pull flarum image

```bash
# build it manually :
docker build --no-cache -t jiangjiali/flarum:latest https://gitee.com/jiangjiali/docker-flarum
```

#### 2 - Docker-compose.yml

```yml
version: "3"

services:
  flarum:
    image: jiangjiali/flarum:latest
    container_name: flarum
    env_file:
      - /mnt/docker/flarum/flarum.env
    volumes:
      - /mnt/docker/flarum/assets:/flarum/app/public/assets
      - /mnt/docker/flarum/extensions:/flarum/app/extensions
      - /mnt/docker/flarum/storage/logs:/flarum/app/storage/logs
      - /mnt/docker/flarum/nginx:/etc/nginx/flarum
    ports:
      - 8888:8888
    depends_on:
      - mariadb

  mariadb:
    image: mariadb:10.5
    container_name: mariadb
    environment:
      - MYSQL_ROOT_PASSWORD=xxxxxxxxxx
      - MYSQL_DATABASE=flarum
      - MYSQL_USER=flarum
      - MYSQL_PASSWORD=xxxxxxxxxx
    volumes:
      - /mnt/docker/mysql/db:/var/lib/mysql
```

#### 3 - Run it

You need a reverse proxy to access flarum, this is not described here. You can use the solution of your choice (Traefik, Nginx, Apache, Haproxy, Caddy, H2O...etc).

Create a environment file (see docker-compose: /mnt/docker/flarum/flarum.env [here](https://github.com/mondediefr/docker-flarum/tree/master#2---docker-composeyml))

```
# vi /mnt/docker/flarum/flarum.env

DEBUG=false
FORUM_URL=http://domain.tld

# Database configuration
DB_HOST=mariadb
DB_NAME=flarum
DB_USER=flarum
DB_PASS=xxxxxxxxxx
DB_PREF=flarum_
DB_PORT=3306

# User admin flarum (environment variable for first installation)
# /!\ admin password must contain at least 8 characters /!\
FLARUM_ADMIN_USER=admin
FLARUM_ADMIN_PASS=xxxxxxxxxx
FLARUM_ADMIN_MAIL=admin@domain.tld
FLARUM_TITLE=Test flarum
```

Run your docker-compose

```sh
docker-compose up -d mariadb
# Wait a moment for the creation of the database
docker-compose up -d flarum
```

* :warning: Your admin password must contain at least **8 characters** (FLARUM_ADMIN_PASS).
* If you get an error 500 with _Something went wrong_ message, switch the `DEBUG` environment variable to `true` to see the actual error message in your browser.

### Install additional php extensions

```yml
version: "3"

services:
  flarum:
    image: mondedie/flarum:stable
    container_name: flarum
    environment:
      - PHP_EXTENSIONS=gmp session brotli
    volumes:
      - /mnt/docker/flarum/assets:/flarum/app/public/assets
      - /mnt/docker/flarum/extensions:/flarum/app/extensions
      - /mnt/docker/flarum/storage/logs:/flarum/app/storage/logs
      - /mnt/docker/flarum/nginx:/etc/nginx/flarum
```

This example install php81-gmp php81-session with apk  
You can find a php extension here https://pkgs.alpinelinux.org/packages?name=php81-*&branch=v3.18&arch=x86_64

### Install custom extensions

**Flarum extensions list :** https://flagrow.io/extensions

#### Install an extension

```sh
docker exec -ti flarum extension require some/extension
```

#### Remove an extension

```sh
docker exec -ti flarum extension remove some/extension
```

#### List all extensions

```sh
docker exec -ti flarum extension list
```

### Custom vhost flarum nginx

File to change the vhost flarum `/etc/nginx/flarum/custom-vhost-flarum.conf`  
To use file custom-vhost-flarum.conf add volume `/etc/nginx/flarum`
Create file in `/mnt/docker/flarum/nginx/custom-vhost-flarum.conf`

```nginx
# Example of custom vhost flarum for nginx
# fix nginx issue for fof/sitemap (https://github.com/FriendsOfFlarum/sitemap)

location = /sitemap.xml {
  try_files $uri $uri/ /index.php?$query_string;
}
```

### Custom composer repositories

To use the composer repository system, add your repo name and json representation in `/mnt/docker/flarum/extensions/composer.repositories.txt`:

```
my_private_repo|{"type":"path","url":"extensions/*/"}
my_public_repo|{"type":"vcs","url":"https://github.com/my/repo"}
```

Example for a private repository in github

Add this in `/mnt/docker/flarum/extensions/composer.repositories.txt`
```
username|{"type":"vcs","url":"https://github.com/username/my-private-repo"}
```

Create a token in github with full control of privates repository  
https://github.com/settings/tokens

Add your github token in var environment
```
GITHUB_TOKEN_AUTH=XXXXXXXXXXXXXXX
```

Add your repo in the list file `/mnt/docker/flarum/extensions/list`
```
username/my-private-repo:0.1.0
```

https://getcomposer.org/doc/03-cli.md#modifying-repositories


### 首次拉取代码
git clone https://gitee.com/jiangjiali/docker-flarum

### 拉取最新代码
git pull

### 打包docker
docker build --no-cache -t jiangjiali/flarum:1.8.10 .

### 运行docker
docker run --env=DB_HOST=43.136.183.206 --env=DEBUG=true --env=DB_USER=root --env=DB_NAME=ftest --env=FORUM_URL=http://127.0.0.1:8888 --runtime=runc -p 127.0.0.1:8888:8888 -d jiangjiali/flarum:1.8.10

docker run --env=DB_USER=root --env=DB_NAME=ftest --env=FORUM_URL=http://43.136.183.206:9999 --runtime=runc -p 0.0.0.0:9999:8888 -d jiangjiali/flarum:1.8.10

### 管理docker
 -- 查看正在运行的容器
docker ps -a  # docker ps -a | grep <容器名>

 -- 停止正在运行的容器
docker stop [CONTAINER ID]

 -- 移除已经停止的容器
docker rm [CONTAINER ID]

docker container prune # 删除所有退出状态的容器
docker volume prune # 删除未被使用的数据卷
docker image prune # 删除 dangling 或所有未被使用的镜像


### 构建环境
```
DB_HOST=1
DB_USER=2
DB_NAME=3
DB_PASS=4
DB_PORT=5
FLARUM_ADMIN_USER=6
FLARUM_ADMIN_PASS=7
FLARUM_ADMIN_MAIL=8
```