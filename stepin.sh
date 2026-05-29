#!/bin/bash

#
# 必要ならコンテナを起動し, 対話的にコンテナに入るためのスクリプト.
# devコンテナに接続するには `dev` あるいは `1` を, 
# deployコンテナに接続するには `deploy` あるいは `2` を入力してエンター.
#
# 引数を与えた場合はそれを入力として扱う. 例えば `./stepin.sh 1` とすればdevコンテナに接続する.
# 

docker-compose up -d
if [ $1 ]; then
    serv=$1
fi

if [ -z "$serv" ]; then
    read -p "which service to step in? (dev:1, deploy:2): " serv
fi

if [ "$serv" = "1" -o "$serv" = "dev" ]; then
    serv="dev"
elif [ "$serv" = "2" -o "$serv" = "deploy" ]; then
    serv="deploy"
else
    echo "invalid input"
    exit 1
fi
docker-compose exec $serv bash
