import bd from '../../models/index.js';

const { Manufacturer } = bd;

export default {
    async add(req, res) {
        try {
            const manufacturer = await Manufacturer.create(req.body);
            res.send({
                manufacturer: manufacturer
            });
        } catch  {
                res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
     async addArray(req, res) {
        try {
            const { items } = req.body;

            if (!Array.isArray(items)) {
                return res.status(400).send({ error: 'Поле "items" должно быть массивом.' });
            }

            console.log('Принятые данные:', items);

            const created = await Promise.all(
                items.map(item => Manufacturer.create({
                    name: item.name,
                    country: item.country
                }))
            );

            res.send({ items: created });
        } catch (error) {
            console.error('Ошибка при обработке массива:', error);
            res.status(500).send({ error: 'Произошла ошибка на сервере.' });
        }
    },


    async get(req, res) {
        try {
            const item = await Manufacturer.findAll();
            res.status(200).json(item);
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for ID:', id);

            const item = await Manufacturer.findByPk(id);

            if (!item) {
                return res.status(404).json({ error: 'Производитель не найден' });
            }

            res.json(item);
        } catch (error) {
            console.error('Ошибка при получения производителя:', error);
            res.status(500).json({ error: 'Не удалось получить производителя.' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Manufacturer.destroy({
                where: { id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Производитель не найден' });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updeted] = await Manufacturer.update(req.body, { where: { id } });

            if (updeted) {
                const update = await Manufacturer.findByPk(id);
                res.status(200).json(update);
            } else {
                res.status(404).json({ error: "Производитель не найден" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


};