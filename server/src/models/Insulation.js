export default (sequelize, DataTypes) => {
    const Insulation = sequelize.define('Insulation', {
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

    return Insulation;
};