export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        delivery_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Deliveries',
                key: 'id',
            },
        },
        product_size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ProductSizes',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    }, {
        tableName: 'Orders',
        timestamps: true,
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, { foreignKey: 'user_id' });
        Order.belongsTo(models.Delivery, { foreignKey: 'delivery_id' });
        Order.belongsTo(models.ProductSize, { foreignKey: 'product_size_id' });
    };

    return Order;
};
