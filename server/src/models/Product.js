export default (sequelize, DataTypes) => {
    // Определение модели 'Product'
    const Product = sequelize.define('Product', {
        // Название товара
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Цена товара
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true, // Проверка на число с плавающей запятой
                min: 0, // Минимальная цена 0
            },
        },
        // Скидка на товар (процент скидки от 0 до 100)
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0, // Минимальное значение скидки 0%
                max: 100, // Максимальное значение скидки 100%
            },
        },
        // Описание товара
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // Артикул товара (уникальный идентификатор, предоставляемый производителем)
        article: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        // Рейтинг товара (0-100)
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 100,
            },
        },
        // Количество просмотров товара
        views_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        // Количество покупок товара
        purchases_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        // ID сезона (связь с таблицей Seasons)
        id_season: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Seasons',
                key: 'id',
            },
        },
        // ID материала (связь с таблицей Materials)
        id_material: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Materials',
                key: 'id',
            },
        },
        // ID утеплителя (связь с таблицей Insulations)
        id_insulation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Insulations',
                key: 'id',
            },
        },
        // ID производителя (связь с таблицей Manufacturers)
        id_manufacturer: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Manufacturers',
                key: 'id',
            },
        },
        // Ссылка на изображение товара
        img: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        timestamps: true, // Добавление полей createdAt и updatedAt
    });

    // Определение связей
    Product.associate = (models) => {
        // Один товар принадлежит одному сезону, материалу, утеплителю и производителю
        Product.belongsTo(models.Season, { foreignKey: 'id_season' });
        Product.belongsTo(models.Material, { foreignKey: 'id_material' });
        Product.belongsTo(models.Insulation, { foreignKey: 'id_insulation' });
        Product.belongsTo(models.Manufacturer, { foreignKey: 'id_manufacturer' });

        // Многие ко многим: товар может иметь несколько цветов, застежек и типов
        Product.belongsToMany(models.Colore, { through: models.ProductColore });
        Product.belongsToMany(models.Claps, { through: models.ProductClaps });
        Product.belongsToMany(models.Type, {
            through: 'ProductTypes',
            foreignKey: 'ProductId',
            otherKey: 'TypeId',
        });
        Product.belongsToMany(models.Size, {
            through: models.ProductSize,
            foreignKey: 'ProductId',
            otherKey: 'SizeId',
            onDelete: 'CASCADE'
        });

        // Один ко многим: товар может иметь несколько изображений и размеров
        Product.hasMany(models.ProductImage, {
            foreignKey: 'ProductId',
            onDelete: 'CASCADE',
        });
        Product.hasMany(models.ProductSize, {
            foreignKey: 'ProductId',
            onDelete: 'CASCADE',
        });
    };

    return Product;
};







