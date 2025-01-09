import InsulationController from '../controllers/description/InsulationController.js'

export const InsulationRoutes = (app) => {

    // Добавить утеплитьель
    app.post('/addInsulation',
        InsulationController.add);

    // Добавить массив утеплитьеля
    app.post('/addArrayInsulation',
        InsulationController.addArray);

    // Получить список утеплитьеля
    app.get('/getInsulation',
        InsulationController.get);

    // Получение утеплитьеля по id
    app.get('/insulation/:id',
        InsulationController.getById);

    // Удаление утеплитьеля
    app.delete('/deleteInsulation/:id',
        InsulationController.delete);

    //Обновление утеплитьеля
    app.put('/putInsulation/:id',
        InsulationController.update);
    
};