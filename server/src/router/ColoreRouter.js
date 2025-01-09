import ColoreController from "../controllers/description/ColoreController.js";

export const ColoreRoutes = (app) => {
    // Добавить цвет
    app.post('/addColore',
        ColoreController.add);

    // Добавить массив цветов
    app.post('/addArrayColore',
        ColoreController.addArray);

    // Получить список цветов
    app.get('/getColore',
        ColoreController.get);

    // Получение цвета по id
    app.get('/colore/:id',
        ColoreController.getById);

    // Удаление цвета
    app.delete('/deleteColore/:id',
        ColoreController.delete);

    //Обновление цвета
    app.put('/putColore/:id',
        ColoreController.update);
}
