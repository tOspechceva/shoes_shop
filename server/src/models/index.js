// src/models/index.js
import { Sequelize, DataTypes } from 'sequelize'; // Импортируем Sequelize и DataTypes
import config from '../config/config.js'; // Импортируем конфигурацию базы данных
import User from './userModel.js'; // Именованный импорт

// Инициализация подключения к базе данных
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);

// Проверка подключения к базе данных
sequelize.authenticate().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

// Экспортируем подключение и Sequelize
const db = {
    User: User(sequelize, DataTypes),
};
db.sequelize = sequelize;  // Экспортируем объект sequelize (не функцию)
db.Sequelize = Sequelize;  // Экспортируем сам класс Sequelize

export default db;  // Экспортируем db как default