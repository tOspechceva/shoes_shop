export default (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        timestamps: false,
    });

    return Size;
};