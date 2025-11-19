# ========= BUILDER =========
FROM node:20-alpine AS builder

# Đặt đúng thư mục frontend, không bị lẫn backend
WORKDIR /app

# Copy package.json + package-lock.json trước để tận dụng cache
COPY frontend/package*.json ./
RUN npm ci

# Copy toàn bộ code frontend vào
COPY frontend/ .

# Build Vite
RUN npm run build

# ========= PRODUCTION =========
FROM nginx:alpine

# Copy file build vào Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Tùy chọn) Nếu bạn muốn React Router hoạt động đẹp
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]