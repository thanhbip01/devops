# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# XÓA HOẶC COMMENT DÒNG DƯỚI ĐÂY
# COPY nginx.conf /etc/nginx/conf.d/default.conf   ← xóa hoặc thêm # ở đầu

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]