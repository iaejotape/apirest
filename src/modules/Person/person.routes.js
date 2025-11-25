import express from "express";
import {
    newPerson,
    listPersons,
    getPersonById,
    getPersonByCpf,
    update,
    remove
} from "./person.controller.js";
import { authenticate, authorizaAdmin } from "../../middleware/authenticate.js";

const personRouter = express.Router();

/* ROTAS PRIVADAS (usuário autenticado) */
personRouter.get("/", authenticate, listPersons);
personRouter.get("/:id", authenticate, getPersonById);
personRouter.get("/cpf/:cpf", authenticate, getPersonByCpf);

/* ROTAS ADMINISTRATIVAS */
personRouter.post("/", authenticate, authorizaAdmin, newPerson);
personRouter.post("/update", authenticate, authorizaAdmin, update);
personRouter.post("/delete", authenticate, authorizaAdmin, remove);

export default personRouter;
