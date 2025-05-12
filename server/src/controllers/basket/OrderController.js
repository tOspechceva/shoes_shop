import bd from '../../models/index.js'; // Импорт моделей
const { Cart, CartItem, Delivery, Order } = bd;

export const placeOrder = async (req, res) => {
    const { user_id, cart_id, deliveryMethod, fullName, phone, address, postalCode } = req.body;
    console.log(req.body);

    // Проверка на наличие обязательных данных
    if (!user_id && !cart_id) {
        return res.status(400).json({ message: 'Необходимо указать cart_id или user_id.' });
    }

    if (!deliveryMethod || !['Почта', 'Самовывоз'].includes(deliveryMethod)) {
        return res.status(400).json({ message: 'Неверный метод доставки.' });
    }

    // Получение данных о корзине
    const userId = Number(user_id) || null;
    const cartId = Number(cart_id) || null;
    const whereCondition = userId ? { user_id: userId } : cartId ? { id: cartId } : null;

    try {
        const cart = await Cart.findOne({ where: whereCondition });
        if (!cart) return res.status(400).json({ message: 'Корзина не найдена' });

        // Проверка на выбранные товары в корзине
        const cartItems = await CartItem.findAll({
            where: { cart_id: cart.id, selected: true },
        });
        if (!cartItems.length) {
            return res.status(400).json({ message: 'Нет выбранных товаров' });
        }

        // Обработка данных доставки
        let delivery = null;
        if (deliveryMethod === 'Почта') {
            if (!fullName || !phone || !address || !postalCode) {
                return res.status(400).json({ message: 'Необходимы все данные для доставки Почтой.' });
            }
            delivery = await Delivery.create({
                user_id: userId,
                full_name: fullName,
                phone,
                address,
                postal_code: postalCode,
                delivery_method: 'post',
            });
        } else {
            if (!fullName || !phone) {
                return res.status(400).json({ message: 'Необходимы все данные для Самовывоза.' });
            }
            delivery = await Delivery.create({
                user_id: userId,
                full_name: fullName,
                phone,
                delivery_method: 'pickup',
            });
        }

        // Создание заказов
        const orders = await Promise.all(cartItems.map(item =>
            Order.create({
                user_id: userId,
                delivery_id: delivery.id,
                product_size_id: item.product_size_id,
                quantity: item.quantity,
            })
        ));

        // Удаление выбранных товаров из корзины
        await CartItem.destroy({
            where: {
                cart_id: cart.id,
                selected: true,
            },
        });

        return res.status(200).json({ message: 'Заказ успешно оформлен', orders });

    } catch (err) {
        console.error('Ошибка при оформлении заказа:', err);
        return res.status(500).json({ message: 'Ошибка сервера при оформлении заказа' });
    }
};
