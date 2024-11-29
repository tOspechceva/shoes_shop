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
        link: {
            type: DataTypes.STRING,
            allowNull: true, // Ссылка может быть пустой
            
        },
    }, {
        timestamps: false,
    });

    return Manufacturer;
};