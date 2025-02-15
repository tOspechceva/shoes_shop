export default (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        url: {
            type: DataTypes.STRING,
            allowNull: false, // URL изображения обязательно
        },
        altText: {
            type: DataTypes.STRING,
            allowNull: true, // Альтернативный текст (можно оставить пустым)
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: true, // Поле для сортировки изображений (по умолчанию null)
        },
    }, {
        timestamps: false,
    });

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: 'ProductId',
            onDelete: 'CASCADE', // Удаляем изображения, если удаляется товар
        });
    };

    return ProductImage;
};