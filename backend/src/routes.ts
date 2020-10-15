import { Router } from "express"; //metodo de rotas
import multer from "multer";

import uploadConfig from "./config/uploads";

//Controllers
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index); //listagem 
routes.get("/orphanages/:id", OrphanagesController.show); //detalhes sobre 1 
routes.post("/orphanages", upload.array("images"), OrphanagesController.create); //criação
// 'upload.array("images")'. para subir as imagens para a pasta uploads

export default routes;