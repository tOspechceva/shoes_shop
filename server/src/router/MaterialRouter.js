import MaterialController from "../controllers/description/MaterialController.js";

export const MaterialRoutes = (app) => {
    // Добавить материал
    app.post('/addMaterial',
        MaterialController.add);

    // Добавить массив материалов
    app.post('/addArrayMaterial',
        MaterialController.addArray);

    // Получить список материалов
    app.get('/getMaterial',
        MaterialController.get);

    // Получение материала по id
    app.get('/material/:id',
        MaterialController.getById);

    // Удаление материала
    app.delete('/deleteMaterial/:id',
        MaterialController.delete);

    //Обновление материала
    app.put('/putMaterial/:id',
        MaterialController.update);
}