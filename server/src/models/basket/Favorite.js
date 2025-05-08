export default (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Favorites',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'product_id'], // чтобы пользователь не мог добавить один товар дважды
            },
        ],
    });

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
        Favorite.belongsTo(models.Product, { foreignKey: 'product_id' });
    };

    return Favorite;
};
