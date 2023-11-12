FROM mongo:7.0-rc

ARG mongo_username=root
ARG mongo_password=example

ENV MONGO_INITDB_ROOT_USERNAME=${mongo_username}
ENV MONGO_INITDB_ROOT_PASSWORD=${mongo_password}

EXPOSE 27017


# To build the image: docker build -f docker/mongo/Dockerfile -t ticketing_mongo:v<version> --build-arg mongo_username=<username> --build-arg mongo_password=<password> .