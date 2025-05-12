import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('/register', credentials)
    },
    login(credentials) {
        return Api().post('/login', credentials)
    },
    createCart(credentials) {
        return Api().post('/createCart', credentials)
    },
    getBasket(params) {
        return Api().get('/get-basket', params);
    },
    updateCart(params) {
        return Api().put('/update-cart', params);
    },
    addCartItem(params) {
        return Api().post('/addCartItem', params);  
    },
    placeOrder(params) {
        return Api().post('/checkout', params); // <-- токен будет добавлен
    },
    updateSelectedState(params) {
        return Api().put('/updateSelectedState', params);
    },
    deleteCartItem(params) {
        return Api().delete('/deleteCartItem', {
            data: params // Тело запроса передаётся через `data`
        });
    }
}

