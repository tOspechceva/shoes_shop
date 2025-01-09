import bd from '../../models/index.js';

const { Size } = bd;

export default {
    async add(req, res) {
        try {
            const size = await Size.create(req.body);
            res.send({
                size: size
            });
        } catch  {
                res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async addArray(req, res) {
        try {
            const { items } = req.body; // Предполагается, что в запросе передан массив 
            if (!Array.isArray(items)) {
                return res.status(400).send({ error: 'Должен быть передан массив.' });
            }

            // Создаем записи в базе данных для каждого цвета
            const created = await Promise.all(items.map(item => Size.create({ name: item })));

            res.send({
                items: created
            });
        } catch (error) {
            console.error('Ошибка при добавлении массива :', error);
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async get(req, res) {
        try {
            const item = await Size.findAll();
            res.status(200).json(item);
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for ID:', id);

            const item = await Size.findByPk(id);

            if (!item) {
                return res.status(404).json({ error: 'Размер не найден' });
            }

            res.json(item);
        } catch (error) {
            console.error('Ошибка при получения размера:', error);
            res.status(500).json({ error: 'Не удалось получить размер.' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Size.destroy({
                where: { id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Размер не найден' });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updeted] = await Size.update(req.body, { where: { id } });

            if (updeted) {
                const update = await Size.findByPk(id);
                res.status(200).json(update);
            } else {
                res.status(404).json({ error: "Размер не найден" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};