import bd from '../models/index.js'; // Импорт моделей
const { CartItem, Cart, ProductSize, Product, Size } = bd;

export default {
    async add(req, res) {
        try {
            const { cartId, productId, sizeId, quantity } = req.body;
            console.log(req.body);
            // Проверка обязательных данных
            if (!cartId || !productId || !sizeId) {
                return res.status(400).json({ error: 'Все поля (cartId, productId, sizeId, quantity) обязательны.', cartId, productId, sizeId, quantity });
            }
            console.log("1");
            // Проверка существования корзины
            const cart = await Cart.findByPk(cartId);
            if (!cart) {
                return res.status(410).json({ error: 'Корзина не найдена.' });
            }
            console.log("2");
            // Поиск записи в таблице ProductSize на основе productId и sizeId
            const productSize = await ProductSize.findOne({
                include: [
                    { model: Product, where: { id: productId } },
                    { model: Size, where: { id: sizeId } },
                ],
            });

            if (!productSize) {
                return res.status(405).json({ error: 'Указанный товар с таким размером не найден.' });
            }
            console.log("3");
            // Проверка наличия товара в корзине
            const existingItem = await CartItem.findOne({
                where: { cart_id: cartId, product_size_id: productSize.id },
            });

            if (existingItem) {
                // Обновляем количество, если товар уже в корзине
                existingItem.quantity += quantity;
                await existingItem.save();

                return res.status(200).json({
                    message: 'Количество товара обновлено.',
                    cartItem: existingItem,
                });
            }

            // Создание новой записи в корзине
            const newCartItem = await CartItem.create({
                cart_id: cartId,
                product_size_id: productSize.id,
                quantity,
            });

            return res.status(201).json({
                message: 'Товар добавлен в корзину.',
                cartItem: newCartItem,
            });
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
            return res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
        }
    },
    async updateCartItem(req, res) {
        const { user_id, product_id, size, selected, quantity } = req.body;
        console.log(req.body);

        if (!size) {
            return res.status(400).json({ message: 'Size is required.' });
        }

        if (selected !== undefined && typeof selected !== 'boolean') {
            return res.status(400).json({ message: 'Invalid selected value. It must be a boolean.' });
        }

        if (quantity !== undefined && (!Number.isInteger(quantity) || quantity <= 0)) {
            return res.status(400).json({ message: 'Quantity must be a positive integer.' });
        }

        try {
            // Получаем ID размера
            const sizeRecord = await Size.findOne({ where: { name: size } });
            if (!sizeRecord) {
                return res.status(404).json({ message: 'Size not found.' });
            }

            // Получаем соответствующий ProductSize
            const productSize = await ProductSize.findOne({
                where: {
                    ProductId: product_id,
                    SizeId: sizeRecord.id,
                },
            });

            if (!productSize) {
                return res.status(404).json({ message: 'ProductSize not found for given product and size.' });
            }

            // 3. Находим все корзины пользователя
            const carts = await Cart.findAll({
                where: {
                    user_id,
                },
            });

            if (!carts.length) {
                return res.status(404).json({ message: 'No carts found for the user.' });
            }

            // Получаем CartItem
            let updated = false;
            for (const cart of carts) {
                const cartItem = await CartItem.findOne({
                    where: {
                        cart_id: cart.id,
                        product_size_id: productSize.id,
                    },
                });

                if (cartItem) {
                    // Обновляем нужные поля
                    if (selected !== undefined) {
                        cartItem.selected = selected;
                    }

                    if (quantity !== undefined) {
                        cartItem.quantity = quantity;
                    }
                    await cartItem.save();
                    updated = true;
                }
            }
            if(updated) {
                return res.status(200).json({ message: 'Selected state updated successfully.' });
            } else {
                return res.status(404).json({ message: 'No matching cart items found to update.' });
            }

        } catch (error) {
            console.error('Error updating cart item:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    },
    async deleteCartItem(req, res) {
        const { user_id, product_id, size} = req.body;
        console.log(req.body);

        if (!size) {
            return res.status(400).json({ message: 'Size is required.' });
        }

        try {
            // Получаем ID размера
            const sizeRecord = await Size.findOne({ where: { name: size } });
            if (!sizeRecord) {
                return res.status(404).json({ message: 'Size not found.' });
            }

            // Получаем соответствующий ProductSize
            const productSize = await ProductSize.findOne({
                where: {
                    ProductId: product_id,
                    SizeId: sizeRecord.id,
                },
            });

            if (!productSize) {
                return res.status(404).json({ message: 'ProductSize not found for given product and size.' });
            }

            // 3. Находим все корзины пользователя
            const carts = await Cart.findAll({
                where: {
                    user_id,
                },
            });

            if (!carts.length) {
                return res.status(404).json({ message: 'No carts found for the user.' });
            }

            // Получаем CartItem
            let updated = false;
            for (const cart of carts) {
                const cartItem = await CartItem.findOne({
                    where: {
                        cart_id: cart.id,
                        product_size_id: productSize.id,
                    },
                });

                if (cartItem) {
                    
                    await cartItem.destroy(); // Удаляем товар из корзины
                    updated = true;
                }
            }
            if (updated) {
                return res.status(200).json({ message: 'Cart item deleted successfully.' });
            } else {
                return res.status(404).json({ message: 'No matching cart items found to delete.' });
            }

        } catch (error) {
            console.error('Error deleting cart item:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }





};
