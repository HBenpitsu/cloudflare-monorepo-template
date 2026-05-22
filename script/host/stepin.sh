docker-compose up -d
echo "which service to step in? (dev:1, deploy:2): "
read serv
if [ "$serv" = "1" ]; then
    serv="dev"
elif [ "$serv" = "2" ]; then
    serv="deploy"
fi
docker-compose exec $serv bash
