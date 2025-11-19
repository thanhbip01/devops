# Stage 1: Build Vite/React
FROM node:20-alpine AS builder

# Đặt working directory
WORKDIR /app

# Copy package.json trước để tận dụng cache
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy toàn bộ source code (sau khi đã install → tận dụng cache)
COPY frontend/ .

# Build app
RUN npm run build

# Stage 2: Serve bằng Nginx
FROM nginx:alpine

# Copy file build ra Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy config nginx nếu cần (tùy chọn)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]