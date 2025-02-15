import ManufacturerController from "../controllers/description/ManufacturerController.js";

export const  ManufacturerRoutes = (app) => {

    //=====================Manufacture==================
    // Добавить производителя
    app.post('/addManufacturer',
        ManufacturerController.add);

    // Добавить массив производителей
    app.post('/addArrayManufacture',
        ManufacturerController.addArray);

    // Получить список производителей
    app.get('/getManufacture',
        ManufacturerController.get);

    // Получение производителя по id
    app.get('/manufacture/:id',
        ManufacturerController.getById);

    // Удаление производителя
    app.delete('/deleteManufacture/:id',
        ManufacturerController.delete);

    //Обновление производителя
    app.put('/putManufacture/:id',
        ManufacturerController.update);
}