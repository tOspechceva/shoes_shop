export default (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    Size.associate = (models) => {
        Size.belongsToMany(models.Product, {
            through: models.ProductSize,
            foreignKey: 'SizeId',
            otherKey: 'ProductId',
            onDelete: 'CASCADE'
        });
        // Связь с ProductSize
        Size.hasMany(models.ProductSize, { foreignKey: 'SizeId' });
    };

    return Size;
};