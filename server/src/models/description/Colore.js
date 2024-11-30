export default (sequelize, DataTypes) => {
    const Colore = sequelize.define('Colore', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });

    return Colore;
};