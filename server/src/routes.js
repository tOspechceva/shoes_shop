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
import ProductTypeController from "./controllers/manyToMany/ProductTypeController.js"

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
    
    //=====================Insulation===================
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
    app.put('/putManufacture../:id',
        ManufacturerController.update);
    
    //=====================Material=====================
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
    
    //======================Size========================
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

    // Добавить массив 
    app.post('/addArrayProduct',
        productController.addArray);
    
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
    app.post('/products/set-types',
        ProductTypeController.setTypesForProduct
    );
    app.get('/products/types/:id',
        ProductTypeController.getTypesForProduct
    );
}



