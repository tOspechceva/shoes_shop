// src/models/index.js
import { Sequelize, DataTypes } from 'sequelize'; // Импортируем Sequelize и DataTypes
import config from '../config/config.js'; // Импортируем конфигурацию базы данных
import User from './userModel.js'; // Именованный импорт
import Product from './Product.js';
import Season from './Season.js';
import Material from './Material.js';
import Insulation from './Insulation.js';
import Manufacturer from './Manufacturer.js';
import Claps from './Claps.js';
import Colore from './Colore.js';
import Size from './Size.js';
import Type from './Type.js';

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
    Product: Product(sequelize, Sequelize.DataTypes),
    Season: Season(sequelize, Sequelize.DataTypes),
    Material: Material(sequelize, Sequelize.DataTypes),
    Insulation: Insulation(sequelize, Sequelize.DataTypes),
    Manufacturer: Manufacturer(sequelize, Sequelize.DataTypes),
    Claps: Claps(sequelize, Sequelize.DataTypes),
    Colore: Colore(sequelize, Sequelize.DataTypes),
    Size: Size(sequelize, Sequelize.DataTypes),
    Type: Type(sequelize, Sequelize.DataTypes),
};
db.sequelize = sequelize;  // Экспортируем объект sequelize (не функцию)
db.Sequelize = Sequelize;  // Экспортируем сам класс Sequelize


// Устанавливаем связи
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;  // Экспортируем db как default