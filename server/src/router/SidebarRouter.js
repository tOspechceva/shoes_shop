import SidebarController from "../controllers/SidebarController.js";

export const SidebarRoutes = (app) => {
    app.get('/seasons-with-types',
        SidebarController.getSeasonsWithTypes
    );
}; 