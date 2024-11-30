export default (sequelize, DataTypes) => {
    const Insulation = sequelize.define('Insulation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
    Insulation.associate = (models) => {
        Insulation.hasMany(models.Product, { foreignKey: 'id_insulation' });
    };
    return Insulation;
};
