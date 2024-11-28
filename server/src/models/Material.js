export default (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
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

    return Material;
};
