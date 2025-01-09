import bd from '../../models/index.js'; // Импорт моделей
const { CartItem, Cart, ProductSize } = bd;

export default {
   
    async createCart(req, res) {
        try {
            const { session_key, user_id } = req.body;

            // Создаём корзину
            const cart = await Cart.create({
                session_key,
                user_id: user_id || null, // Если пользователь не авторизован, сохраняем только session_key
            });

            res.send({
                "success": true,
                cart_id: cart.id
            });
        } catch (error) {
            res.status(400).json({ "success": false, error: error.message });
        }
    },

    /**
    * Получение данных корзины
    * @returns {Promise<Object>} - данные корзины
    */
    async getBasket(req, res) {
        try {
            const cart_id  = Number(req.query.cart_id);
            const user_id = Number(req.query.user_id) || null;
            // Определяем условие выборки
            console.log(cart_id, '\n', user_id, '\n');
            const whereCondition = user_id
                ? { user_id }
                : cart_id
                    ? { id: cart_id }
                    : null;
            console.log(whereCondition, '\n');
            // Если условие отсутствует, возвращаем ошибку или пустой ответ
            if (!whereCondition) {
                return res.status(400).json({ error: 'Необходимо указать cart_id или user_id.' });
            }
           
            const cart = await Cart.findAll({
                where: whereCondition,
                include: [
                    {
                        model: CartItem,
                        include: [
                            {
                                model: ProductSize,
                                include: ['Product', 'Size'], // Включаем связанные данные для удобства
                            },
                        ],
                    },
                ],
            });

            if (!cart || cart.length === 0) {
                return res.status(404).json({ success: false, error: 'Корзины не найдены' });
            }

            // Формируем данные для ответа
            const items = cart.flatMap(cart =>
                (cart.CartItems || []).map(item => ({
                    cart_id: cart.id, // Указываем идентификатор корзины
                    id: item.ProductSize.Product.id,
                    quantity: item.quantity,
                    selected: item.selected,
                    product: {
                        id: item.ProductSize.Product.id,
                        name: item.ProductSize.Product.name,
                        size: item.ProductSize.Size.name,
                        price: item.ProductSize.Product.price,
                        img: item.ProductSize.Product.img,
                    },
                }))
            );
            res.status(200).json({
                items,
                cart_id: cart.id
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    /**
     * Обновление корзины: добавление user_id к существующему session_key
     * @returns {Promise<Object>} - результат обновления корзины
     */
    async updateCart(req, res) {
        try {
            const { session_key, user_id } = req.body;

            // Ищем корзину по session_key
            const cart = await Cart.findOne({ where: { session_key } });

            if (!cart) {
                return res.status(400).json({
                    error: 'Корзина с указанным session_key не найдена'
                });
            }

            // Обновляем user_id
            cart.user_id = user_id;
            await cart.save();

            res.status(200).json({
                success:true,
                cart_id: cart.id
            });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },
};

