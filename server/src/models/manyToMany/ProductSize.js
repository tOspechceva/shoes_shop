export default (sequelize, DataTypes) => {
    const ProductSize = sequelize.define('ProductSize', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Автоматическое увеличение значения
            primaryKey: true,    // Установка как первичный ключ
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // Установите значение по умолчанию, если необходимо
            validate: {
                min: 0, // Убедитесь, что количество не может быть отрицательным
            },
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Products',
                key: 'id',
            },
        },
        SizeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Sizes',
                key: 'id',
            },
        },
    });

    // Связь many-to-many между Product и Size через ProductSize
    ProductSize.associate = (models) => {
        // Связь many-to-many между Product и Size через ProductSize
        models.Product.belongsToMany(models.Size, { through: ProductSize });
        models.Size.belongsToMany(models.Product, { through: ProductSize });
        ProductSize.belongsTo(models.Product, { foreignKey: 'ProductId' });
        ProductSize.belongsTo(models.Size, { foreignKey: 'SizeId' });
        ProductSize.hasMany(models.Order, { foreignKey: 'product_size_id' });
        ProductSize.hasMany(models.CartItem, { foreignKey: 'product_size_id' });
    };

    return ProductSize;
};


  

      
    