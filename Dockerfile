FROM node:6.10

RUN mkdir /app
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .

RUN npm run build

VOLUME /src/config

EXPOSE 3000

CMD ["node", "dist/index.js"]