# frontend/Dockerfile – DÁN NGUYÊN VÀO FILE TRONG THƯ MỤC frontend/
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package từ đúng chỗ
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy toàn bộ code (bắt buộc có index.html)
COPY . .

# ← DẤU CHẤM THỨ 2 LÀ QUAN TRỌNG NHẤT

# Build
RUN npm run build

# Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]