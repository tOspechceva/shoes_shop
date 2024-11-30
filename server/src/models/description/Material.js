export default (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    Material.associate = (models) => {
        Material.hasMany(models.Product, { foreignKey: 'id_material' });
    };
    return Material;
};
