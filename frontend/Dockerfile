FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . /app

RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]