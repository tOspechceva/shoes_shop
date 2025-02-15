export default (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, { foreignKey: 'role_id' });
    };
    
    return Role;
};