FROM node:8-slim

WORKDIR /invoice-management
ENV NODE_ENV development

COPY package.json /invoice-management/package.json

RUN npm install --production

COPY .env.example /invoice-management/.env.example
COPY . /invoice-management

CMD ["npm","start"]

EXPOSE 8080
