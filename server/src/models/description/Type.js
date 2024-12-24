export default (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        timestamps: false,
    });
    Type.associate = (models) => {
        
        Type.belongsToMany(models.Product, {
            through: 'ProductTypes',
            foreignKey: 'TypeId',
            otherKey: 'ProductId',
        });
    };

    return Type;
};
