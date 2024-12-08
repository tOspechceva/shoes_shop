import bd from '../models/index.js';

const { Product, Season, Material, Insulation, Manufacturer } = bd;

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

    async addArray(req, res) {
        try {
            const { items } = req.body;

            if (!Array.isArray(items)) {
                return res.status(400).send({ error: 'Поле "items" должно быть массивом.' });
            }

            console.log('Принятые данные:', items);

            const created = await Promise.all(
                items.map(item => Product.create({
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    rating: item.rating,
                    id_season: item.id_season,
                    id_material: item.id_material,
                    id_insulation: item.id_insulation,
                    id_manufacturer: item.id_manufacturer,
                    img: item.img
                }))
            );

            


            console.log(created);

            res.send({ items: created });
        } catch (error) {
            console.error('Ошибка при обработке массива:', error);
            res.status(500).send({ error: 'Произошла ошибка на сервере.' });
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
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log('Request for product ID:', id);

            // Найти товар с включением связанных данных
            const product = await Product.findByPk(id, {
                include: [
                    { model: Season, attributes: ['name'] }, // Получить название сезона
                    { model: Material, attributes: ['name'] }, // Получить название материала
                    { model: Insulation, attributes: ['name'] }, // Получить название утеплителя
                    { model: Manufacturer, attributes: ['name', 'country'] }, // Получить имя производителя
                ],
            });

            if (!product) {
                return res.status(404).json({ error: 'Товар не найден' });
            }

            res.json(product);
        } catch (error) {
            console.error('Ошибка при получении товара:', error);
            res.status(500).json({ error: 'Не удалось получить товар.' });
        }
    },

};