# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Runtime stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5000

CMD ["node", "server.js"]
