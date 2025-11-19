# ========= BUILDER =========
FROM node:20-alpine AS builder
WORKDIR /app

# Copy đúng thư mục frontend
COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps

COPY frontend/ .

# Build Vite
RUN npm run build

# ========= PRODUCTION =========
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]