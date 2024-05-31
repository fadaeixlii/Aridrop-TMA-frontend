FROM node:20.14.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY /etc/letsencrypt/live/airdrop.tma.ir /etc/letsencrypt/live/airdrop.tma.ir
COPY /etc/letsencrypt/archive/airdrop.tma.ir /etc/letsencrypt/archive/airdrop.tma.ir

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
