FROM node:20-alpine

WORKDIR /frontend

COPY package.json /frontend/

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start" ]