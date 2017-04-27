FROM node:6.10

ADD package.json package.json
RUN npm install
ADD . .

VOLUME /src/config

EXPOSE 3000

CMD ["node","index.js"]