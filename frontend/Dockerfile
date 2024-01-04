FROM node:latest as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

# Set the environment variable for Node.js to use legacy crypto policy
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
