import bd from '../../models/index.js'; // Импорт моделей
const { CartItem, Cart, ProductSize, Product, Size } = bd;

export default {
    async add(req, res) {
        try {
            const { cartId, productId, sizeId, quantity } = req.body;

            // Проверка обязательных данных
            if (!cartId || !productId || !sizeId ) {
                return res.status(400).json({ error: 'Все поля (cartId, productId, sizeId, quantity) обязательны.', cartId, productId, sizeId, quantity });
            }
            console.log("1");
            // Проверка существования корзины
            const cart = await Cart.findByPk(cartId);
            if (!cart) {
                return res.status(404).json({ error: 'Корзина не найдена.' });
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
                return res.status(404).json({ error: 'Указанный товар с таким размером не найден.' });
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
};
