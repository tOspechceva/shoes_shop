export default (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        url: {
            type: DataTypes.STRING,
            allowNull: false, // URL изображения обязательно
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