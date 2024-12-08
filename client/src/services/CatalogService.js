import Api from '@/services/Api'

export default {
    paginated(params) {
        return Api().get('paginated', params); // Параметры передаются через `params`
    },
    getProductById(id) {
        return Api().get(`/products/${id}`);
    },
    filtered(params){
        return Api().get('/filtered', params)
    },
}