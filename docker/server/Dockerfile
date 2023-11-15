FROM node:21-alpine3.17

ARG ENV
ARG PORT

WORKDIR /user/src/app

COPY ../server/package*.json ./

RUN npm install

COPY ../server .

RUN npm run build:${ENV}

EXPOSE ${PORT}

CMD ["npm", "run", "start"]

# to build the image: docker build -t ticketing-server -f docker/server/Dockerfile --build-arg ENV=<dev|prod> --build-arg PORT=3000 .
