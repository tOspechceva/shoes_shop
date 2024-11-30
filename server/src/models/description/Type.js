export default (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        timestamps: false,
    });

    return Type;
};
