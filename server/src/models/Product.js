
export default (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false, // Поле обязательно
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false, // Поле обязательно
            validate: {
                isFloat: true, // Убедимся, что цена — число с плавающей точкой
                min: 0, // Цена не может быть отрицательной
            },
        },
        description: {
            type: DataTypes.TEXT, // Для длинного текста описания
            allowNull: true, // Описание может быть пустым
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true, // Рейтинг может отсутствовать
            validate: {
                min: 0, // Рейтинг не может быть меньше 0
                max: 5, // Рейтинг не может быть больше 5
            },
        },
        id_season: {
            type: DataTypes.INTEGER,
            allowNull: true, // Поле может быть пустым, если родитель удалён
            defaultValue: null, // Значение по умолчанию при удалении родителя
            references: {
                model: 'Seasons', // Связь с таблицей Seasons
                key: 'id',
            },
        },
        id_material: {
            type: DataTypes.INTEGER,
            allowNull: true, // Поле может быть пустым, если родитель удалён
            defaultValue: null, // Значение по умолчанию при удалении родителя
            references: {
                model: 'Materials', // Связь с таблицей Materials
                key: 'id',
            },
        },
        id_insulation: {
            type: DataTypes.INTEGER,
            allowNull: true, // Поле может быть пустым, если родитель удалён
            defaultValue: null, // Значение по умолчанию при удалении родителя
            references: {
                model: 'Insulations', // Связь с таблицей Insulations
                key: 'id',
            },
        },
        id_manufacturer: {
            type: DataTypes.INTEGER,
            allowNull: true, // Поле может быть пустым, если родитель удалён
            defaultValue: null, // Значение по умолчанию при удалении родителя
            references: {
                model: 'Manufacturers', // Связь с таблицей Manufacturers
                key: 'id',
            },
        }
    }, {
        timestamps: true, // Включаем `createdAt` и `updatedAt`
    });
    Product.associate = (models) => {

        Product.belongsTo(models.Season, { foreignKey: 'id_season' });
        Product.belongsTo(models.Material, { foreignKey: 'id_material' });
        Product.belongsTo(models.Insulation, { foreignKey: 'id_insulation' });
        Product.belongsTo(models.Manufacturer, { foreignKey: 'id_manufacturer' });

        Product.belongsToMany(models.Colore, { through: models.ProductColore });
        Product.belongsToMany(models.Claps, { through: models.ProductClaps });
        Product.belongsToMany(models.Type, {
            through: 'ProductTypes',
            foreignKey: 'ProductId',
            otherKey: 'TypeId',
        });
        // Связь с таблицей ProductSize через многие ко многим
        Product.belongsToMany(models.Size, {
            through: 'ProductSize',
            foreignKey: 'ProductId',
            otherKey: 'SizeId',
        });

    
        // Связь с таблицей ProductImage (один ко многим)
        Product.hasMany(models.ProductImage, {
            foreignKey: 'ProductId',
            onDelete: 'CASCADE', // Удаляем связанные изображения, если товар удаляется
        });
        
        Product.hasMany(models.ProductSize, { foreignKey: 'ProductId', onDelete: 'CASCADE' });

    };

    return Product;
};





