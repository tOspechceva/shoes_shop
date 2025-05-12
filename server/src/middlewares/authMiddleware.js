import bd from '../models/index.js';

const { User, Cart } = bd;

const authMiddleware = async (req, res, next) => {
    // Получаем sessionKey из заголовков запроса
    const sessionKey = req.headers['sessionkey'];  // sessionKey будет в заголовке запроса

    if (!sessionKey) {
        return res.status(401).json({ message: 'Нет sessionKey' });
    }

    try {
        // Ищем корзину по sessionKey в таблице Cart
        const cart = await Cart.findOne({
            where: {
                session_key: sessionKey, // ищем корзину с таким sessionKey
            },
            include: {
                model: User, // Загружаем пользователя, связанного с корзиной
                required: true, // Обязательно наличие пользователя
            },
        });

        if (!cart) {
            return res.status(401).json({ message: 'Не найден активный sessionKey или корзина' });
        }

        const user = cart.User; // Получаем связанного пользователя
        req.user = user; // Передаем пользователя в следующий обработчик
        next(); // Продолжаем выполнение запроса
    } catch (error) {
        return res.status(401).json({ message: 'Неверный sessionKey', error });
    }
};

export default authMiddleware;
