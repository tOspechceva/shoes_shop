import SizeController from "../controllers/SizeController.js";

export const SizeRoutes = (app) => {
    // Добавить размер
    app.post('/addSize',
        SizeController.add);

    // Добавить массив размеров
    app.post('/addArraySize',
        SizeController.addArray);

    // Получить список размеров
    app.get('/getSize',
        SizeController.get);

    // Получение размера по id
    app.get('/size/:id',
        SizeController.getById);

    // Удаление размера
    app.delete('/deleteSize/:id',
        SizeController.delete);

    //Обновление размера
    app.put('/putSize/:id',
        SizeController.update);
}