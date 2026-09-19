# syntax=docker/dockerfile:1.4
# Multi-Stage High-Performance Production Dockerfile for CYBRAVION Solutions

# Stage 1: Build & bundle
FROM node:22-alpine AS builder

WORKDIR /app

# Enable increased memory for Vite build on low-RAM VPS instances
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Install dependencies using BuildKit persistent cache mount
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --prefer-offline --no-audit

# Copy application source code
COPY . .

# Build production bundle with persistent npm cache
RUN --mount=type=cache,target=/root/.npm \
    npm run build

# Stage 2: Minimal Production Web Server
FROM nginx:alpine-slim

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose container internal port
EXPOSE 80

# Health check
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
