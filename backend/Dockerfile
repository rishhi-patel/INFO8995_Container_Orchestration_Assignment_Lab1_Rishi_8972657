# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Runtime stage
FROM node:22-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app ./

# Create a directory for logs (if not using volume)
RUN mkdir -p logs && chown -R appuser:appgroup logs

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]
