export default (sequelize, DataTypes) => {
    const Delivery = sequelize.define('Delivery', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
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
    }, {
        tableName: 'Deliveries',
        timestamps: true,
    });

    Delivery.associate = (models) => {
        Delivery.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Delivery;
};

