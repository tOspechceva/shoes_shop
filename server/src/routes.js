import AuthenticationController from "./controllers/AuthenticationController.js"
import AuthenticationControllerPolicy from './policies/AuthenticationControllerPolicy.js'

import SeasonController from './controllers/SeasonController.js'
import InsulationController from './controllers/InsulationController.js'
import ClapsController from "./controllers/ClapsController.js"
import ColoreController from "./controllers/ColoreController.js"
import ManufacturerController from "./controllers/ManufacturerController.js"
import MaterialController from "./controllers/MaterialController.js"
import SizeController from "./controllers/SizeController.js"
import TypeController from "./controllers/TypeController.js"
import productController from "./controllers/productController.js"

export const setupRoutes = (app) => {
    //=======================User=======================
    //Зарегистрировать пользователя
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);
    //Вход в систему пользователем
    app.post('/login',
        AuthenticationController.login);
    
    //======================Season======================
    // Добавить сезон
    app.post('/addSeason',
        SeasonController.add);
    
    //=====================Insulation===================
    // Добавить утеплитьель
    app.post('/addInsulation',
        InsulationController.add);
    
    //======================Claps=======================
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
    
    //====================Colore========================
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
    
    //=====================Manufacture==================
    // Добавить производителя
    app.post('/addManufacturer',
        ManufacturerController.add);
    
    //=====================Material=====================
    // Добавить материал
    app.post('/addMaterial',
        MaterialController.add);
    
    //======================Size========================
    // Добавить размер
    app.post('/addSize',
        SizeController.add);
    
    //======================Type========================
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
    //======================Product=====================
    // Добавить продукт
    app.post('/addProduct',
        productController.add);

    // Получить список продуктов
    app.get('/getProduct',
        productController.get);

    // Обновить продукт
    app.put('/putProduct/:id',
        productController.update);

    // Удалить продукт
    app.delete('/deleteProduct/:id',
        productController.delete);
    
    // Получение товаров с пагинацией(разбиением на страницы)
    app.get('/paginated',
        productController.getPaginated);
    
    // Получение товар по id
    app.get('/products/:id',
        productController.getById);
    //======================================================
}



