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
                res.status(400).send({ error: 'This email is already in use.' });
            } else {
                res.status(500).send({ error: 'An unexpected error occurred.' });
            }
        }
    }
};