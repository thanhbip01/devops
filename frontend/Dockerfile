# frontend/Dockerfile - Phiên bản chuẩn cho Vite/React trên Railway
FROM node:20-alpine AS builder

# WORKDIR ở /app
WORKDIR /app

# Copy package.json từ thư mục hiện tại (frontend/)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy toàn bộ code từ thư mục hiện tại (frontend/)
COPY . .

# Build
RUN npm run build

# Serve bằng Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Config Nginx cho SPA (React Router)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]