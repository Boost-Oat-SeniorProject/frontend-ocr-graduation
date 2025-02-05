FROM node:20-alpine

WORKDIR /frontend

COPY . /frontend/

RUN npm install

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start" ]