// controllers/productController.js
//import Product from '../models/Product.js';
//import Season from '../models/Season.js';
//import Material from '../models/Material.js';
//import Insulation from '../models/Insulation.js';
//import Manufacturer from '../models/Manufacturer.js';
import bd from '../models/index.js';

const { Product } = bd;

export default {
    async add(req, res) {
        try {
            const product = await Product.create(req.body);
            res.send({
                product: product
            });
        } catch  {
                res.status(500).send({ error: 'Произошла непредвиденная ошибка.' });
        }
    },

    // 2. Получение списка всех продуктов
    async get(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // 3. Обновление информации о продукте
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Product.update(req.body, { where: { id } });

            if (updated) {
                const updatedProduct = await Product.findByPk(id);
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // 4. Удаление продукта
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({ where: { id } });

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getPaginated(req, res){
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const offset = (page - 1) * limit;

            const { rows: products, count } = await Product.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
            });

            res.status(200).json({
                products,
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
};