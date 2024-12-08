import db from '../../models/index.js';

const { Product, Colore } = db;

export default {
    // Установка типов для продукта
    async setColoreForProduct(req, res) {
        try {
            const { productId, coloreIds } = req.body;

            if (!Array.isArray(coloreIds)) {
                return res.status(400).send({ error: 'Поле "coloreIds" должно быть массивом.' });
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            await product.setColores(coloreIds); // Связывает продукт с типами
            res.status(200).json({ message: 'Цвета успешно установлены для продукта.' });
        } catch (error) {
            console.error('Ошибка при установке цветов для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при установке цветов.' });
        }
    },

    // Получение типов продукта
    async getColoreForProduct(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for product ID:', id);
            const product = await Product.findByPk(id, {
                include: { model: Colore }
            });

            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            res.json(product.Colores);
        } catch (error) {
            console.error('Ошибка при получении типов для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при получении типов.' });
        }
    }
};
