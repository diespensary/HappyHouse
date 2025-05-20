# Stage 1 - Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Production
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Меняем путь копирования:
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]