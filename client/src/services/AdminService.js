import Api from '@/services/Api';

export default {
    //-----------Claps----------------
    addClaps(credentials) {
        return Api().post('/addClaps', credentials);
    },
    getClaps() {
        return Api().get('/getClaps');
    },
    updateClaps(id, data) {
        return Api().put(`/putClaps/${id}`, data); 
    },
    deleteClaps(id) {
        return Api().delete(`/deleteClaps/${id}`); 
    },
    //-----------Colore----------------
    addColore(credentials) {
        return Api().post('/addColore', credentials);
    },
    getColore() {
        return Api().get('/getColore');
    },
    updateColore(id, data) {
        return Api().put(`/putColore/${id}`, data); 
    },
    deleteColore(id) {
        return Api().delete(`/deleteColore/${id}`); 
    },
    //-----------Insulation----------------
    addInsulation(credentials) {
        return Api().post('/addInsulation', credentials);
    },
    getInsulation() {
        return Api().get('/getInsulation');
    },
    updateInsulation(id, data) {
        return Api().put(`/putInsulation/${id}`, data); 
    },
    deleteInsulation(id) {
        return Api().delete(`/deleteInsulation/${id}`); 
    },
    //-----------Manufacture----------------
    addManufacturer(credentials) {
        return Api().post('/addManufacturer', credentials);
    },
    getManufacture() {
        return Api().get('/getManufacture');
    },
    updateManufacture(id, data) {
        return Api().put(`/putManufacture/${id}`, data); 
    },
    deleteManufacture(id) {
        return Api().delete(`/deleteManufacture/${id}`); 
    },
    //-----------Material----------------
    addMaterial(credentials) {
        return Api().post('/addMaterial', credentials);
    },
    getMaterial() {
        return Api().get('/getMaterial');
    },
    updateMaterial(id, data) {
        return Api().put(`/putMaterial/${id}`, data); 
    },
    deleteMaterial(id) {
        return Api().delete(`/deleteMaterial/${id}`); 
    },
    //-----------Season----------------
    addSeason(credentials) {
        return Api().post('/addSeason', credentials);
    },
    getSeason() {
        return Api().get('/getSeason');
    },
    updateSeason(id, data) {
        return Api().put(`/putSeason/${id}`, data); 
    },
    deleteSeason(id) {
        return Api().delete(`/deleteSeason/${id}`); 
    },
    //-----------Size----------------
    addSize(credentials) {
        return Api().post('/addSize', credentials);
    },
    getSize() {
        return Api().get('/getSize');
    },
    updateSize(id, data) {
        return Api().put(`/putSize/${id}`, data); 
    },
    deleteSize(id) {
        return Api().delete(`/deleteSize/${id}`); 
    },
    //-----------Type----------------
    addType(credentials) {
        return Api().post('/addType', credentials);
    },
    getType() {
        return Api().get('/getType');
    },
    updateType(id, data) {
        return Api().put(`/putType/${id}`, data);
    },
    deleteType(id) {
        return Api().delete(`/deleteType/${id}`);
    },
};