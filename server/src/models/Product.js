export default (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 0,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 100,
            },
        },
        views_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        purchases_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        id_season: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Seasons',
                key: 'id',
            },
        },
        id_material: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Materials',
                key: 'id',
            },
        },
        id_insulation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Insulations',
                key: 'id',
            },
        },
        id_manufacturer: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'Manufacturers',
                key: 'id',
            },
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        timestamps: true,
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
        Product.belongsToMany(models.Size, {
            through: 'ProductSize',
            foreignKey: 'ProductId',
            otherKey: 'SizeId',
        });

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






