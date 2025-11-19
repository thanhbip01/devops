# frontend/Dockerfile – DÁN NGUYÊN ĐOẠN NÀY (không thêm bớt gì)
FROM node:20-alpine AS builder
WORKDIR /app

# Copy đúng package.json của frontend
COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps

# Copy toàn bộ code frontend (bắt buộc phải có dòng này)
COPY frontend/. .

# Build
RUN npm run build

# Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]