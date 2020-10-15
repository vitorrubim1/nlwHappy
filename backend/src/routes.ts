import { Router } from "express"; //metodo de rotas

//Controllers
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();

routes.post("/orphanages", OrphanagesController.create);

export default routes;