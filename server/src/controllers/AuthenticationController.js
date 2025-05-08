import bd from '../models/index.js';  // Предположим, что вы экспортировали модели из db.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { Op } from 'sequelize';

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

const { User } = bd;


export default {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON();
            res.send({
                user: user,
                token: jwtSignUser(userJson) // Создание токена для пользователя
            });

        } catch (error) {
            console.error('Error creating user:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).send({ error: 'Этот адрес электронной почты уже используется.' });
            } else {
                res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
            }
        }
    },
    async login(req, res) {
        try {
            const { identifier, password } = req.body;
        
            // Определяем, является ли идентификатор email или номером телефона
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: identifier },
                        { phone: identifier }
                    ]
                }
            });

            if (!user) {
                return res.status(403).send({
                    error: 'Информация для входа неверна (email или телефон)'
                });
            }

            // Сравниваем хешированный пароль из базы данных с введенным
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'Информация для входа неверна (password)'
                });
            }

            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson) // Создание токена для пользователя
            });

        } catch (error) {
            console.error('Ошибка авторизации:', error.message); // Логирование ошибки
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    }

};