// Модель пользователя для базы данных
const User = (sequelize, DataTypes) => {
    // Определение модели "user"
    const User = sequelize.define("User", {

        // Поле для email
        email: {
            type: DataTypes.STRING, // Тип данных - строка
            unique: true,           // Email должен быть уникальным
            isEmail: true,          // Проверка формата email
            allowNull: false,       // Это поле обязательно для заполнения
        },
        // Поле для пароля
        password: {
            type: DataTypes.STRING, // Тип данных - строка
            allowNull: false,       // Это поле обязательно для заполнения
        },
    },
        {
            timestamps: true,       // Включение автоматических полей для времени создания и обновления записи
        });

    return User;
};

export default User; // Экспортируем модель как дефолтную