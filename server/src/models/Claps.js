export default (sequelize, DataTypes) => {
    const Claps = sequelize.define('Claps', {
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

    return Claps;
};