import TypeController from "../controllers/description/TypeController.js";
export const TypeRoutes = (app) => {
    // Добавить тип
    app.post('/addType',
        TypeController.add);

    // Добавить массив типов
    app.post('/addArrayType',
        TypeController.addArray);

    // Получить список типов
    app.get('/getType',
        TypeController.get);

    // Получение типа по id
    app.get('/type/:id',
        TypeController.getById);

    // Удаление типа
    app.delete('/deleteType/:id',
        TypeController.delete);

    //Обновление типа
    app.put('/putType/:id',
        TypeController.update);
};