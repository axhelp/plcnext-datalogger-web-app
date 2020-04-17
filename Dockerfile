FROM node:current as Builder-server
WORKDIR /usr/app
RUN ls
COPY ./server .
RUN npm ci
RUN npm run build

FROM node:current as Builder-frontend
WORKDIR /usr/app
RUN ls
COPY ./frontend .
RUN npm ci
RUN npm run build

FROM node:current-alpine
WORKDIR /usr/app
COPY --from=Builder-server /usr/app .
COPY --from=Builder-frontend /usr/app/build ./public
RUN ls /usr/app
RUN ls /usr/app/public

CMD ["npm", "run", "start"]
