// src/models/index.js
import { Sequelize, DataTypes } from 'sequelize'; // Импортируем Sequelize и DataTypes
import config from '../config/config.js'; // Импортируем конфигурацию базы данных
import User from './userModel.js'; // Именованный импорт
import Product from './Product.js';

import Season from './description/Season.js';
import Material from './description/Material.js';
import Insulation from './description/Insulation.js';
import Manufacturer from './description/Manufacturer.js';
import Claps from './description/Claps.js';
import Colore from './description/Colore.js';
import Size from './description/Size.js';
import Type from './description/Type.js';

import ProductColore from './manyToMany/ProductColore.js';
import ProductClaps from './manyToMany/ProductClaps.js';
import ProductSize from './manyToMany/ProductSize.js';
import ProductType from './manyToMany/ProductType.js';

import Order from './basket/Orders.js';
import Cart from './basket/Cart.js'
import  CartItem  from './basket/CartItem.js';

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

    ProductColore: ProductColore(sequelize),
    ProductClaps: ProductClaps(sequelize),
    ProductSize: ProductSize(sequelize, Sequelize.DataTypes),
    ProductType: ProductType(sequelize),

    Order: Order(sequelize, Sequelize.DataTypes),
    Cart: Cart(sequelize, Sequelize.DataTypes),
    CartItem: CartItem(sequelize, Sequelize.DataTypes)

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