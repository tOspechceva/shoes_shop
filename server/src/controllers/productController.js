
import bd from '../models/index.js';

const { Product, Season, Material, Insulation, Manufacturer, Type, Size, ProductImage, ProductSize, Colore, Claps } = bd;

export default {
    async add(req, res) {
        try {
            const item = req.body;

            const product = await Product.create({
                name: item.name,
                price: item.price,
                description: item.description,
                rating: item.rating,
                id_season: item.id_season,
                id_material: item.id_material,
                id_insulation: item.id_insulation,
                id_manufacturer: item.id_manufacturer,
                img: item.img
            });
            console.log("Обработка типов " + ' | \n ');
            // Обработка типов
            if (Array.isArray(item.typeIds)) {
                await product.setTypes(item.typeIds);
            } else {
                return res.status(400).send({ error: 'Поле "typeIds" должно быть массивом.' });
            }
            console.log("Обработка застежек " + ' | \n ');
            // Обработка застежек
            if (Array.isArray(item.clapsIds)) {
                await product.setClaps(item.clapsIds);
            } else {
                return res.status(400).send({ error: 'Поле "clapsIds" должно быть массивом.' });
            }
            console.log("Обработка размеров с количеством "+ ' | \n ');
            /// Обработка размеров с количеством
            if (!Array.isArray(item.sizes) || item.sizes.length === 0) {
                return res.status(400).json({ error: "Invalid sizes array" });
            } else {
                for (const size of item.sizes) {
                    console.log(size + ' | ');
                    const sizeRecord = await Size.findOne({ where: { name: size.value } });
                    console.log(sizeRecord + ' | ');
                    if (sizeRecord) {
                        await ProductSize.create({
                            ProductId: product.id,
                            SizeId: sizeRecord.id,
                            count: size.quantity
                        });
                        console.log(true + '\n');
                    }
                }
            }
            // Обработка цветов
            if (Array.isArray(item.coloreIds)) {
                await product.setColores(item.coloreIds);
            } else {
                return res.status(400).send({ error: 'Поле "coloreIds" должно быть массивом.' });
            }
            
            // Обработка изображений
            if (Array.isArray(item.imageUrls)) {
                const productImages = item.imageUrls.map(url => ({ url, ProductId: product.id }));
                await ProductImage.bulkCreate(productImages); // Сохраняем несколько изображений
            } else if (item.imageUrls) {
                return res.status(400).send({ error: 'Поле "imageUrls" должно быть массивом.' });
            }
            res.send({
                product: product
            });
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error);
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
                items.map(async (item) => {
                    const product = await Product.create({
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        rating: item.rating,
                        id_season: item.id_season,
                        id_material: item.id_material,
                        id_insulation: item.id_insulation,
                        id_manufacturer: item.id_manufacturer,
                        img: item.img
                    });

                    if (Array.isArray(item.typeIds)) {
                        await product.setTypes(item.typeIds); // Связывает продукт с типами
                    } else {
                        throw new Error('Поле "typeIds" должно быть массивом.');
                    }

                    if (Array.isArray(item.clapsIds)) {
                        await product.setClaps(item.clapsIds); // Связывает продукт с застежкой
                    } else {
                        throw new Error('Поле "clapsIds" должно быть массивом.');
                    }

                    if (Array.isArray(item.sizeIds)) {
                        await product.setSizes(item.sizeIds); // Связывает продукт с размером
                    } else {
                        throw new Error('Поле "sizeIds" должно быть массивом.');
                    }

                    if (Array.isArray(item.coloreIds)) {
                        await product.setColores(item.coloreIds); // Связывает продукт с цветом
                    } else {
                        throw new Error('Поле "coloreIds" должно быть массивом.');
                    }


                    return product;
                })
            );

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
    async getPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            // Получаем все параметры фильтрации из запроса
            const {
                seasonId, typeId, colorId, materialId,
                insulationId, clapsId, manufacturerId, sizeId
            } = req.query;

            let whereConditions = {};
            let includeConditions = [];

            if (seasonId) {
                whereConditions.id_season = seasonId;
            }
            if (colorId) {
                includeConditions.push({
                    model: Colore,  // Модель цвета
                    where: { id: colorId },  // Условие фильтрации по цвету
                    through: { attributes: [] }  // Если используется промежуточная таблица, не нужно извлекать дополнительные атрибуты из нее
                });
            }
            if (materialId) {
                whereConditions.id_material = materialId;
            }
            if (insulationId) {
                whereConditions.id_insulation = insulationId;
            }
            if (clapsId) {
              
                includeConditions.push({
                    model: Claps,  // Модель 
                    where: { id: clapsId },  // Условие фильтрации по 
                    through: { attributes: [] }  // Если используется промежуточная таблица, не нужно извлекать дополнительные атрибуты из нее
                });
            }
            if (manufacturerId) {
                whereConditions.id_manufacturer = manufacturerId;
            }

            if (typeId) {
                includeConditions.push({
                    model: Type,
                    where: { id: typeId },
                    through: {
                        attributes: [],
                    },
                });
            }

            // Добавляем размеры
            if (sizeId) {
                includeConditions.push({
                    model: Size,
                    where: { id: sizeId }, // фильтрация по sizeId
                    through: {
                        attributes: ['count'],
                    },
                });
            } else {
                includeConditions.push({
                    model: Size,
                    through: {
                        attributes: ['count'],
                    },
                });
            }

            // Выполняем запрос с фильтрами
            const { rows: products, count } = await Product.findAndCountAll({
                where: whereConditions,
                limit,
                offset,
                distinct: true,
                include: includeConditions,
            });

            const formattedProducts = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                rating: product.rating,
                img: product.img,
                sizes: product.Sizes.map(size => ({
                    id: size.id,
                    name: size.name,
                    count: size.ProductSize.count,
                })),
            }));

            res.status(200).json({
                products: formattedProducts,
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
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
    async getFiltered(req, res) {
        try {
            const { season, type } = req.query;

            const products = await Product.findAll({
                    where: {
                        season,
                        type,
                    },
            });
            res.json({ products });
            
        } catch (error) {
            console.error('Ошибка при получении товара:', error);
            res.status(500).json({ error: 'Не удалось получить товар.' });
        }
    }

};