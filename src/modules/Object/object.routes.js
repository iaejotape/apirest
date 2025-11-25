import express from "express";
import {
    newObject,
    listObjects,
    getObjectById,
    getObjectsByCollection,
    update,
    remove
} from "./object.controller.js";
import { authenticate, authorizaAdmin } from "../../middleware/authenticate.js";

const objectRouter = express.Router();

/* ROTAS PRIVADAS (usuário autenticado) */
objectRouter.get("/", authenticate, listObjects);
objectRouter.get("/:id", authenticate, getObjectById);
objectRouter.get("/collection/:collectionId", authenticate, getObjectsByCollection);

/* ROTAS ADMINISTRATIVAS */
objectRouter.post("/", authenticate, authorizaAdmin, newObject);
objectRouter.post("/update", authenticate, authorizaAdmin, update);
objectRouter.post("/delete", authenticate, authorizaAdmin, remove);

export default objectRouter;
