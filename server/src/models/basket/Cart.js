export default (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        session_key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, { foreignKey: 'user_id' });
        Cart.hasMany(models.CartItem, { foreignKey: 'cart_id' });
    };

    return Cart;
};
