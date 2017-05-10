FROM node:6.10

RUN apt-get update
RUN apt-get install -y netcat

RUN mkdir /app
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .

RUN npm run build

VOLUME /src/config

EXPOSE 80

ADD https://raw.githubusercontent.com/ufoscout/docker-compose-wait/1.0.0/wait.sh /wait.sh
RUN chmod +x /wait.sh

RUN echo "node dist/index.js 80" > start.sh
RUN chmod +x start.sh

CMD /wait.sh && ./start.sh