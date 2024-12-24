import AuthenticationController from "../controllers/AuthenticationController.js"
import AuthenticationControllerPolicy from '../policies/AuthenticationControllerPolicy.js'

export const UserRoutes = (app) => {
    //Зарегистрировать пользователя
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);
    //Вход в систему пользователем
    app.post('/login',
        AuthenticationController.login);
};