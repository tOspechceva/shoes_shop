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
            through: 'ProductSize',
            foreignKey: 'SizeId',
            otherKey: 'ProductId',
        });
    };

    return Size;
};