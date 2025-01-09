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

}

