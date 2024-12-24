import db from '../../models/index.js';

const { Product, Type } = db;

export default {
    // Установка типов для продукта
    
    async setTypesForProduct(req, res) {
        try {
            const { productId, typeIds } = req.body;

            if (!Array.isArray(typeIds)) {
                return res.status(400).send({ error: 'Поле "typeIds" должно быть массивом.' });
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            await product.setTypes(typeIds); // Связывает продукт с типами
            res.status(200).json({ message: 'Типы успешно установлены для продукта.' });
        } catch (error) {
            console.error('Ошибка при установке типов для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при установке типов.' });
        }
    },

    // Получение типов продукта
    async getTypesForProduct(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for product ID:', id);
            const product = await Product.findByPk(id, {
                include: { model: Type }
            });

            if (!product) {
                return res.status(404).json({ error: 'Продукт не найден' });
            }

            res.json(product.Types);
        } catch (error) {
            console.error('Ошибка при получении типов для продукта:', error);
            res.status(500).json({ error: 'Произошла ошибка при получении типов.' });
        }
    }
};
