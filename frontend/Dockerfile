
FROM node:10.19
WORKDIR /usr/src/frontend-app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000

CMD ["yarn", "start"]