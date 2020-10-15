import { Router } from "express"; //metodo de rotas

//Controllers
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();

routes.get("/orphanages", OrphanagesController.index); //listagem 
routes.post("/orphanages", OrphanagesController.create); //criação

export default routes;