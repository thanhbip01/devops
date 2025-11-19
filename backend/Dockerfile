# backend/Dockerfile
FROM node:20-alpine

# Chỉ làm việc trong thư mục backend
WORKDIR /app

# Copy đúng backend thôi, không copy cả project
COPY backend/package*.json ./
RUN npm ci --legacy-peer-deps

# Copy code backend
COPY backend/ .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]