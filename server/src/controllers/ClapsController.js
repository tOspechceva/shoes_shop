// controllers/productController.js
//import Product from '../models/Product.js';
//import Season from '../models/Season.js';
//import Material from '../models/Material.js';
//import Insulation from '../models/Insulation.js';
//import Manufacturer from '../models/Manufacturer.js';
import bd from '../models/index.js';

const { Claps } = bd;

export default {
    async add(req, res) {
        try {
            const claps = await Claps.create(req.body);
            res.send({
                claps: claps
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
            const created = await Promise.all(items.map(item => Claps.create({ name: item })));

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
            const item = await Claps.findAll();
            res.status(200).json(item);
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for ID:', id);

            const item = await Claps.findByPk(id);

            if (!item) {
                return res.status(404).json({ error: 'Застежка не найдена' });
            }

            res.json(item);
        } catch (error) {
            console.error('Ошибка при получения застежки:', error);
            res.status(500).json({ error: 'Не удалось получить застежку.' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Claps.destroy({
                where: { id }
            });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Застежка не найдена' });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updeted] = await Claps.update(req.body, { where: { id } });

            if (updeted) {
                const update = await Claps.findByPk(id);
                res.status(200).json(update);
            } else {
                res.status(404).json({ error: "Застежка не существует" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};