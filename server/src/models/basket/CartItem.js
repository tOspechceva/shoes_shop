export default (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        selected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        product_size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ProductSizes',
                key: 'id',
            },
        },
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });
        CartItem.belongsTo(models.ProductSize, { foreignKey: 'product_size_id' });
    };

    return CartItem;
};

