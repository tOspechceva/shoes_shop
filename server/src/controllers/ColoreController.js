// controllers/productController.js
//import Product from '../models/Product.js';
//import Season from '../models/Season.js';
//import Material from '../models/Material.js';
//import Insulation from '../models/Insulation.js';
//import Manufacturer from '../models/Manufacturer.js';
import bd from '../models/index.js';

const { Colore } = bd;

export default {
    async add(req, res) {
        try {
            const colore = await Colore.create(req.body);
            res.send({
                colore: colore
            });
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async addArray(req, res) {
        try {
            const { colors } = req.body; // Предполагается, что в запросе передан массив цветов
            if (!Array.isArray(colors)) {
                return res.status(400).send({ error: 'Должен быть передан массив цветов.' });
            }

            // Создаем записи в базе данных для каждого цвета
            const createdColors = await Promise.all(colors.map(color => Colore.create({ name: color })));

            res.send({
                colors: createdColors
            });
        } catch (error) {
            console.error('Ошибка при добавлении цветов:', error);
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async get(req, res) {
        try {
            const colore = await Colore.findAll();
            res.status(200).json(colore);
        } catch {
            res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for colore ID:', id);

            const colore = await Colore.findByPk(id);

            if (!colore) {
                return res.status(404).json({ error: 'Цвет не найден' });
            }

            res.json(colore);
        } catch (error) {
            console.error('Ошибка при получении цвета:', error);
            res.status(500).json({ error: 'Не удалось получить цвет.' });
        }
    },
    
    
};