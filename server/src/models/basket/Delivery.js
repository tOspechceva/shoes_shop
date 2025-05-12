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
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        delivery_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true, // null, если самовывоз
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true, // null, если самовывоз
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

