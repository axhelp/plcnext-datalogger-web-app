FROM node:current as Builder
WORKDIR /usr/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:current-alpine
WORKDIR /usr/app
COPY --from=Builder /usr/app .

CMD ["npm", "run", "start"]
