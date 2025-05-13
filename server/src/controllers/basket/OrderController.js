import bd from '../../models/index.js'; // Импорт моделей
const { Cart, CartItem, Delivery, Order, ProductSize } = bd;

export const placeOrder = async (req, res) => {
    const { user_id, cart_id, deliveryMethod, fullName, phone, address, postalCode} = req.body;
    
    // Проверка на наличие обязательных данных
    if (!user_id && !cart_id) {
        return res.status(400).json({ message: 'Необходимо указать cart_id или user_id.' });
    }


    if (!deliveryMethod || !['post', 'pickup'].includes(deliveryMethod)) {
        return res.status(400).json({ message: 'Неверный метод доставки.' });
    }
    // Получение данных о корзине
    const userId = Number(user_id) || null;
    const cartId = Number(cart_id) || null;
    const whereCondition = userId ? { user_id: userId } : cartId ? { id: cartId } : null;

    try {
        // Получение всех корзин пользователя или по cart_id
        const carts = await Cart.findAll({ where: whereCondition });

        if (!carts.length) {
            return res.status(410).json({ message: 'Корзины не найдены.' });
        }

        // Получение всех выбранных товаров из всех корзин
        const cartIds = carts.map(cart => cart.id);

        const cartItems = await CartItem.findAll({
            where: {
                cart_id: cartIds,
                selected: true,
            },
        });

        if (!cartItems.length) {
            return res.status(402).json({ message: 'Нет выбранных товаров.' });
        }
        // Обработка данных доставки
        let delivery = null;
        if (deliveryMethod === 'post') {
            if (!fullName || !phone || !address || !postalCode) {
                return res.status(403).json({ message: 'Необходимы все данные для доставки Почтой.' });
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
                return res.status(406).json({ message: 'Необходимы все данные для Самовывоза.' });
            }
            delivery = await Delivery.create({
                user_id: userId,
                full_name: fullName,
                phone,
                delivery_method: 'pickup',
            });
        }


        const orders = await Promise.all(cartItems.map(async (item) => {
            const productSize = await ProductSize.findByPk(item.product_size_id, {
                include: [{
                    model: bd.Product,
                    attributes: ['price'],
                }]
            });

            if (!productSize || !productSize.Product) {
                throw new Error(`Не удалось найти цену для размера товара с id=${item.product_size_id}`);
            }

            const totalPrice = productSize.Product.price * item.quantity;

            return Order.create({
                user_id: userId,
                delivery_id: delivery.id,
                product_size_id: item.product_size_id,
                quantity: item.quantity,
                total_price: totalPrice,
            });
        }));

        // Удаление выбранных товаров из корзины
        
        await CartItem.destroy({
            where: {
                cart_id: cartIds, // массив ID всех корзин
                selected: true,
            },
        });

        return res.status(200).json({ message: 'Заказ успешно оформлен', orders });

    } catch (err) {
        console.error('Ошибка при оформлении заказа:', err);
        return res.status(500).json({ message: 'Ошибка сервера при оформлении заказа' });
    }
};
