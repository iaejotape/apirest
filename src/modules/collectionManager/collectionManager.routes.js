import express from "express";
import {
    newCollectionManager,
    listCollectionManagers,
    getManagersByCollection,
    getCollectionsByManager,
    update,
    remove
} from "./collectionManager.controller.js";
import { authenticate, authorizaAdmin } from "../../middleware/authenticate.js";

const collectionManagerRouter = express.Router();

/* ROTAS ADMINISTRATIVAS */
collectionManagerRouter.get("/", authenticate, authorizaAdmin, getManagersByCollection);
collectionManagerRouter.get("/minhas", authenticate, getCollectionsByManager);
collectionManagerRouter.post("/", authenticate, authorizaAdmin, newCollectionManager);
collectionManagerRouter.post("/update", authenticate, authorizaAdmin, update);
collectionManagerRouter.post("/delete", authenticate, authorizaAdmin, remove);

export default collectionManagerRouter;
