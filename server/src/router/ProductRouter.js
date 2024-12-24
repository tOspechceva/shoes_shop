import productController from "../controllers/productController.js";
import ProductTypeController from "../controllers/manyToMany/ProductTypeController.js"
import ProductSizeController from "../controllers/manyToMany/ProductSizeController.js"
import ProductColoreController from "../controllers/manyToMany/ProductColoreController.js"
import ProductClapsController from "../controllers/manyToMany/ProductClapsController.js"

export const productRoutes = (app) => {
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

    app.get('/filtered',
        productController.getFiltered
    )

    //======================================================
    app.post('/products/set-types',
        ProductTypeController.setTypesForProduct
    );
    app.get('/products/types/:id',
        ProductTypeController.getTypesForProduct
    );
    //======================================================
    app.post('/products/set-size',
        ProductSizeController.setSizeForProduct
    );
    app.get('/products/size/:id',
        ProductSizeController.getSizeForProduct
    );
    //======================================================
    app.post('/products/set-colore',
        ProductColoreController.setColoreForProduct);
    app.get('/products/colore/:id',
        ProductColoreController.getColoreForProduct);

    //======================================================
    app.post('/products/set-claps',
        ProductClapsController.setClapsForProduct);
    app.get('/products/claps/:id',
        ProductClapsController.getClapsForProduct);
    

}