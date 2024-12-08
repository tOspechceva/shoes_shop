import bd from '../models/index.js';

const { Material } = bd;

export default {
    async add(req, res) {
        try {
            const material = await Material.create(req.body);
            res.send({
                material: material
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
            const created = await Promise.all(items.map(item => Material.create({ name: item })));

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
            const item = await Material.findAll();
            res.status(200).json(item);
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for ID:', id);

            const item = await Material.findByPk(id);

            if (!item) {
                return res.status(404).json({ error: 'Материал не найден' });
            }

            res.json(item);
        } catch (error) {
            console.error('Ошибка при получения материала:', error);
            res.status(500).json({ error: 'Не удалось получить материал.' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Material.destroy({
                where: { id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Материал не найден' });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updeted] = await Material.update(req.body, { where: { id } });

            if (updeted) {
                const update = await Material.findByPk(id);
                res.status(200).json(update);
            } else {
                res.status(404).json({ error: "Материал не найден" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};