import express from "express";
import {
    newCollection,
    listCollections,
    getCollectionById,
    getCollectionsByOwner,
    update,
    remove
} from "./collection.controller.js";
import { authenticate, authorizaAdmin } from "../../middleware/authenticate.js";

const collectionRouter = express.Router();

/* ROTAS PRIVADAS (usuário autenticado) */
collectionRouter.get("/", authenticate, listCollections);
collectionRouter.get("/minhas", authenticate, getCollectionsByOwner);
collectionRouter.get("/:id", authenticate, getCollectionById);

/* ROTAS ADMINISTRATIVAS */
collectionRouter.post("/", authenticate, authorizaAdmin, newCollection);
collectionRouter.post("/update", authenticate, authorizaAdmin, update);
collectionRouter.post("/delete", authenticate, authorizaAdmin, remove);

export default collectionRouter;
