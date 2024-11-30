export default (sequelize, DataTypes) => {
    const Season = sequelize.define('Season', {
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
    Season.associate = (models) => {
        Season.hasMany(models.Product, { foreignKey: 'id_season' });
    };
    return Season;
};
