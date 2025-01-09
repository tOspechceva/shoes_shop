import CartController from "../controllers/basket/CartController.js"
import CartItemController from "../controllers/basket/CartItemController.js";

export const CartRoutes = (app) => {
    
    app.post('/createCart',
        CartController.createCart);

   
    app.get('/get-basket',
        CartController.getBasket);

   
    app.put('/update-cart',
        CartController.updateCart);
    
    app.post('/addCartItem',
        CartItemController.add);
};