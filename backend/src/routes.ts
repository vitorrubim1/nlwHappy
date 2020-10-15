import { Router } from "express"; //metodo de rotas

//Controllers
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();

routes.get("/orphanages", OrphanagesController.index); //listagem 
routes.get("/orphanages/:id", OrphanagesController.show); //detalhes sobre 1 
routes.post("/orphanages", OrphanagesController.create); //criação

export default routes;