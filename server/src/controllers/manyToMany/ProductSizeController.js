import db from '../../models/index.js';

const { Product, Size } = db;

export default {
    // Установка типов для продукта
    async setSizeForProduct(req, res) {
        try {
            const { productId, sizeIds } = req.body;

            if (!Array.isArray(sizeIds)) {
                return res.status(400).send({ error: 'Поле "Ids" должно быть массивом.' });
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            await product.setSizes(sizeIds); // Связывает продукт с типами
            res.status(200).json({ message: 'Размеры успешно установлены для продукта.' });
        } catch (error) {
            console.error('Ошибка при установки размеров для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при установке размеров.' });
        }
    },

    // Получение типов продукта
    async getSizeForProduct(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for product ID:', id);
            const product = await Product.findByPk(id, {
                include: { model: Size }
            });

            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            // Используем правильное имя свойства для связанных данных (sizes)
            res.json(product.Sizes);
        } catch (error) {
            console.error('Ошибка при получении размеров для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при получении размеров.' });
        }
    }
};
