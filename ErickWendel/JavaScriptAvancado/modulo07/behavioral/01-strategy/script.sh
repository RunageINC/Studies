docker run \
    --name postgres-erick-wendel-strategy \
    -e POSTGRES_USER=arthurgomes \
    -e POSTGRES_PASSWORD="senha0001" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres

docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=arthurgomes \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb