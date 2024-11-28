FROM alpine:3.19
ENV NODE_VERSION 23.3.0
WORKDIR /
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]