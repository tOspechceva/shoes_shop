export default (sequelize, DataTypes) => {
    const Season = sequelize.define('Season', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return Season;
};
