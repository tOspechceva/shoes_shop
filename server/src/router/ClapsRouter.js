import ClapsController from "../controllers/ClapsController.js"

export const ClapsRoutes = (app) => {
    // Добавить застежку
    app.post('/addClaps',
        ClapsController.add);

    // Добавить массив застежек
    app.post('/addArrayClaps',
        ClapsController.addArray);

    // Получить список застежек
    app.get('/getClaps',
        ClapsController.get);

    // Получение застежки по id
    app.get('/claps/:id',
        ClapsController.getById);

    // Удаление застежки
    app.delete('/deleteClaps/:id',
        ClapsController.delete);

    //Обновление застежки
    app.put('/putClaps/:id',
        ClapsController.update);
};