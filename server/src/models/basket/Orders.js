export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        product_size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ProductSizes', // Название таблицы `ProductSize`
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1, // Количество должно быть хотя бы 1
            },
        },
    },{
        timestamps: true,
    });

    Order.associate = (models) => {
        Order.belongsTo(models.ProductSize, { foreignKey: 'product_size_id' });
    };

    return Order;
};
