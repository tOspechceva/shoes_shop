// Модель пользователя для базы данных
export const userModel = (sequelize, DataTypes) => {
    // Определение модели "user"
    const User = sequelize.define("user", {
        // Поле для имени пользователя
        userName: {
            type: DataTypes.STRING, // Тип данных - строка
            allowNull: false,       // Это поле обязательно для заполнения
        },
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

    // Возвращаем определённую модель User для использования в других частях приложения
    return User;
};