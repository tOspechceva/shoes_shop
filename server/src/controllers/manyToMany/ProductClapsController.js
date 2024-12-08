import db from '../../models/index.js';

const { Product, Claps } = db;

export default {
    // Установка типов для продукта
    async setClapsForProduct(req, res) {
        try {
            const { productId, clasIds } = req.body;

            if (!Array.isArray(clasIds)) {
                return res.status(400).send({ error: 'Поле "clasIds" должно быть массивом.' });
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            await product.setClaps(clasIds); // Связывает продукт с типами
            res.status(200).json({ message: 'Застежеки успешно установлены для продукта.' });
        } catch (error) {
            console.error('Ошибка при установке застежек для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при установке застежек.' });
        }
    },

    // Получение типов продукта
    async getClapsForProduct(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for product ID:', id);
            const product = await Product.findByPk(id, {
                include: { model: Claps }
            });

            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            res.json(product.Claps);
        } catch (error) {
            console.error('Ошибка при получении застежек для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при получении застежек.' });
        }
    }
};
