export default (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
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

    return Type;
};
