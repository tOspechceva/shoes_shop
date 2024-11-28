export default (sequelize, DataTypes) => {
    const Manufacturer = sequelize.define('Manufacturer', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return Manufacturer;
};
