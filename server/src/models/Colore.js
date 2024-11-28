export default (sequelize, DataTypes) => {
    const Colore = sequelize.define('Colore', {
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

    return Colore;
};