import { placeOrder } from '../controllers/basket/OrderController.js';


export const OrderRoutes = (app) => {
    app.post('/checkout', placeOrder);
}