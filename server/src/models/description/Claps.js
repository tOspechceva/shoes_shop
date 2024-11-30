export default (sequelize, DataTypes) => {
    const Claps = sequelize.define('Claps', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        timestamps: false,
    });

    return Claps;
};