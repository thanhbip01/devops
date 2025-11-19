FROM node:20-alpine
WORKDIR /app

# Copy package trước để tận dụng cache
COPY package*.json ./
RUN npm ci --only=production

# Copy code
COPY . .

EXPOSE 5000
ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server.js"]
# Nếu file chính của bạn là index.js, app.js, src/index.js → sửa lại ở đây