FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . /app

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]