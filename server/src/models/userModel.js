import bcrypt from 'bcryptjs';

const saltRounds = 10; // Количество раундов шифрования для хеширования пароля

// Функция для хеширования пароля перед сохранением пользователя
async function hashPassword(user) {
    if (!user.changed('password')) return; // Хеширование выполняется только при изменении пароля
    try {
        const hash = await bcrypt.hash(user.password, saltRounds); // Хеширование пароля
        user.setDataValue('password', hash); // Сохранение хеша в поле пароля
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err; // В случае ошибки выбрасываем исключение
    }
}

export default (sequelize, DataTypes) => {

    // Определение модели 'User'
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Электронная почта (уникальное поле)
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true, // Проверка на корректный формат email
            },
        },

        // Дата рождения пользователя
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true, // Поле необязательно для заполнения
        },

        // Пол пользователя (например, 'male', 'female', 'other')
        gender: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: true, // Поле необязательно для заполнения
        },

        // Пароль пользователя
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Телефон пользователя
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: true, // Проверка на числовой формат
            },
        },

        // Роль пользователя 
        role: {
            type: DataTypes.ENUM('user', 'admin', 'seller'),
            allowNull: false, // Роль не может быть NULL
            defaultValue: 'user', // Значение по умолчанию
            validate: {
                isIn: [['user', 'admin', 'seller']], // Разрешены только эти значения
            },
        }

    }, {
        timestamps: true, // Автоматическое добавление полей createdAt и updatedAt
        hooks: {
            beforeSave: hashPassword, // Перед сохранением хешируем пароль
        },
    });

    // Метод для проверки пароля при входе
    User.prototype.comparePassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password); // Сравнение пароля с хешем
        } catch (err) {
            console.error('Error comparing password:', err);
            throw new Error('Error during password comparison');
        }
    };

    // Связи для Cart и Role
    User.associate = (models) => {
        User.hasMany(models.Cart, { foreignKey: 'user_id' });
        User.hasMany(models.Favorite, { foreignKey: 'user_id' });
        User.hasMany(models.Delivery, { foreignKey: 'user_id' });
        User.hasMany(models.Order, { foreignKey: 'user_id' });
    };

    

    return User;
};
