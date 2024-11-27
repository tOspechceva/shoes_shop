import bd from '../models/index.js';  // Предположим, что вы экспортировали модели из db.js


const { User } = bd;

export default {
    async register(req, res) {
        try {
            // Логирование тела запроса
            console.log('Request body:', req.body);
            const user = await User.create(req.body)
            res.send(user.toJSON())

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
            const { email, password } = req.body
            console.log('Request body:', req.body);
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'Информация для входа неверна'
                })
            }

            const isPasswordValid = password === user.password
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'Информация для входа неверна'
                })
            }

            const userJson = user.toJSON()
            res.send(
                { user: userJson })

        } catch (error) {
            console.error('Ошибка авторизации:', error.message); // Логирует ошибку
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    }
};