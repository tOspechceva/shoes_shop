import AuthenticationController from "./controllers/AuthenticationController.js"

export const setupRoutes = (app) => {
    app.post('/register', AuthenticationController.register)
}
