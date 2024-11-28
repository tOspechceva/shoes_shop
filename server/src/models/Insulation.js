export default (sequelize, DataTypes) => {
    const Insulation = sequelize.define('Insulation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return Insulation;
};
