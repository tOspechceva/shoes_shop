import CartController from "../controllers/basket/CartController.js"
import CartItemController from "../controllers/CartItemController.js";

export const CartRoutes = (app) => {

    app.post('/createCart',
        CartController.createCart);


    app.get('/get-basket',
        CartController.getBasket);


    app.put('/update-cart',
        CartController.updateCart);

    app.post('/addCartItem',
        CartItemController.add);

    app.put('/updateSelectedState',
        CartItemController.updateCartItem);
    app.delete('/deleteCartItem',
        CartItemController.deleteCartItem);

};