# Базовый образ Node.js для сборки проекта
FROM node:18 AS build

# Установим рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY client/package*.json ./

# Установим зависимости
RUN npm install

# Копируем все файлы фронтенда
COPY client .

# Собираем проект
RUN npm run build

# Для продакшн-сервера используем nginx
FROM nginx:alpine

# Копируем скомпилированный фронтенд в директорию nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт для nginx
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
