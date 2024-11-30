export default (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, link: {
            type: DataTypes.STRING,
            allowNull: true, // Ссылка может быть пустой
            
        },
    }, {
        timestamps: false,
    });

    Material.associate = (models) => {
        Material.hasMany(models.Product, { foreignKey: 'id_material' });
    };
    return Material;
};
