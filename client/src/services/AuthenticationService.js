import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials)
    },
    login(credentials) {
        return Api().post('login', credentials)
    },
    paginated(params) {
        return Api().get('paginated', params); // Параметры передаются через `params`
    },
    getProductById(id) {
        return Api().get(`/products/${id}`);
    },
}

