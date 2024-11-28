export default (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
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

    return Size;
};