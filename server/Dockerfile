# Базовый образ Node.js
FROM node:18

# Установим рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY server/package*.json ./

# Установим зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY server .

# Открываем порт для приложения
EXPOSE 8081

# Запускаем сервер
CMD ["node", "src/app.js"]
