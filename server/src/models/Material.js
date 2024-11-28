export default (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return Material;
};
