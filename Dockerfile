FROM node:16-alpine3.14
WORKDIR /opt/app
COPY . .
RUN yarn build
CMD ["npm","run", "start"]

