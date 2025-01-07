export default (sequelize) => {
    const Favorite = sequelize.define('Favorite', {});

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
        Favorite.belongsTo(models.Product, { foreignKey: 'product_id' });
    };

    return Favorite;
};
