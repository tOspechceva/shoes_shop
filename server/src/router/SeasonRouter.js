import SeasonController from '../controllers/SeasonController.js'

export const SeasonRoutes = (app) => {
    // Добавить сезон
    app.post('/addSeason',
        SeasonController.add);

    // Добавить массив сезона
    app.post('/addArraySeason',
        SeasonController.addArray);

    // Получить список сезонов
    app.get('/getSeason',
        SeasonController.get);

    // Получение сезона по id
    app.get('/season/:id',
        SeasonController.getById);

    // Удаление сезона
    app.delete('/deleteSeason/:id',
        SeasonController.delete);

    //Обновление сезона
    app.put('/putSeason/:id',
        SeasonController.update);
    
}; 