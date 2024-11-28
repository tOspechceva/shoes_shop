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
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);
    app.post('/login',
        AuthenticationController.login);
    app.post('/addSeason',
        SeasonController.add);
    app.post('/addInsulation',
        InsulationController.add);
    app.post('/addClaps',
        ClapsController.add);
    app.post('/addColore',
        ColoreController.add);
    app.post('/addManufacturer',
        ManufacturerController.add);
    app.post('/addMaterial',
        MaterialController.add);
    app.post('/addSize',
        SizeController.add);
    app.post('/addType',
        TypeController.add);
    app.post('/addProduct',
        productController.add);
}



