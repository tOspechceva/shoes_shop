export default (sequelize, DataTypes) => {
    const Delivery = sequelize.define('Delivery', {
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        delivery_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Ожидание',
        },
    });

    Delivery.associate = (models) => {
        Delivery.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Delivery;
};
