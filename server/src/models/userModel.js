// Модель пользователя для базы данных
import bcrypt from 'bcryptjs';

const saltRounds = 10;

async function hashPassword(user) {
    if (!user.changed('password')) return;
    try {
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.setDataValue('password', hash);
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        hooks: {
            beforeSave: hashPassword, // Используем только этот хук
        },
    });

    User.prototype.comparePassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (err) {
            console.error('Error comparing password:', err);
            throw new Error('Error during password comparison');
        }
    };

    // Связи для Cart
    User.associate = (models) => {
        User.hasMany(models.Cart, { foreignKey: 'user_id' }); 
    };

    return User;
};