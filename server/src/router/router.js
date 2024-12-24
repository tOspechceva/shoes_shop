import { ClapsRoutes } from "./ClapsRouter.js"
import { ColoreRoutes } from "./ColoreRouter.js";
import { InsulationRoutes } from "./InsulationRouter.js";
import { ManufacturerRoutes } from "./ManufactureRoutrer.js";
import { MaterialRoutes } from "./MaterialRouter.js";
import { productRoutes } from "./ProductRouter.js";
import { SeasonRoutes } from "./SeasonRouter.js";
import { SizeRoutes } from "./SizeRouter.js";
import { TypeRoutes } from "./TypeRouter.js";
import { UserRoutes } from "./UserRouter.js";
import { SidebarRoutes } from "./SidebarRouter.js";

export const setupRoutes = (app) => {
    ClapsRoutes(app);
    ColoreRoutes(app);
    InsulationRoutes(app);
    ManufacturerRoutes(app);
    MaterialRoutes(app);
    productRoutes(app);
    SeasonRoutes(app);
    SizeRoutes(app);
    TypeRoutes(app);
    UserRoutes(app);
    SidebarRoutes(app);
}