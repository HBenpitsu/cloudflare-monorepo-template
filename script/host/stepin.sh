#!/bin/bash

#
# 必要ならコンテナを起動し, 対話的にコンテナに入るためのスクリプト.
# devコンテナに接続するには `dev` あるいは `1` を, 
# deployコンテナに接続するには `deploy` あるいは `2` を入力してエンター.
# 

docker-compose up -d
read -p "which service to step in? (dev:1, deploy:2): " serv
if [ "$serv" = "1" ]; then
    serv="dev"
elif [ "$serv" = "2" ]; then
    serv="deploy"
else
    echo "invalid input"
    exit 1
fi
docker-compose exec $serv bash
