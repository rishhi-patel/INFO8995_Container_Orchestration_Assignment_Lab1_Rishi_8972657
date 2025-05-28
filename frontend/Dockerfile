FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build



FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/out/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]