FROM node:6.10

RUN npm install -g nodemon

ADD package.json package.json
RUN npm install
ADD . .

EXPOSE 3000

CMD ["node","index.js"]