# frontend/Dockerfile - Phiên bản hoàn hảo cho Vite + Railway 2025
FROM node:20-alpine AS builder

# Chuyển vào thư mục /app
WORKDIR /app

# Copy package.json và lock file từ thư mục frontend
COPY package*.json ./
RUN npm ci --legacy-peer-deps --ignore-scripts

# Copy TOÀN BỘ code từ thư mục frontend (đây là chìa khóa để có index.html)
COPY . .

# Build production (Vite sẽ tìm thấy index.html)
RUN npm run build

# Serve bằng Nginx (nhẹ và nhanh)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Config Nginx cho SPA (React Router)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]