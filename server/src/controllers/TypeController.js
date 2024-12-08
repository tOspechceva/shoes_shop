import bd from '../models/index.js';

const { Type } = bd;

export default {
    async add(req, res) {
        try {
            const type = await Type.create(req.body);
            res.send({
                type: type
            });
        } catch  {
                res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async addArray(req, res) {
        try {
            console.log("Зашел в функцию ");
            const { types } = req.body; // Предполагается, что в запросе передан массив элементов
            if (!Array.isArray(types)) {
                return res.status(400).send({ error: 'Должен быть передан массив типов.' });
            }
            console.log("Получил данные", types);
            // Создаем записи в базе данных для каждого элемента
            const createdType = await Promise.all(types.map(type => Type.create({ name: type })));

            res.send({
                types: createdType
            });
        } catch (error) {
            console.error('Ошибка при добавлении массива типа:', error);
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async get(req, res) {
        try {
            const type = await Type.findAll();
            res.status(200).json(type);
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for colore ID:', id);

            const type = await Type.findByPk(id);

            if (!type) {
                return res.status(404).json({ error: 'Тип не найден' });
            }

            res.json(type);
        } catch (error) {
            console.error('Ошибка при получении типа:', error);
            res.status(500).json({ error: 'Не удалось получить тип.' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Type.destroy({
                where: { id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Тип не найден' });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updeted] = await Type.update(req.body, { where: { id } });

            if (updeted) {
                const updateType = await Type.findByPk(id);
                res.status(200).json(updateType);
            } else {
                res.status(404).json({ error: "Тип не существует" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};