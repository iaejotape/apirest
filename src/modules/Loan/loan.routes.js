import express from "express";
import {
    newLoan,
    listLoans,
    getLoanById,
    getLoansByPerson,
    getLoansByObject,
    getPendingLoans,
    update,
    returnLoan,
    remove
} from "./loan.controller.js";
import { authenticate, authorizaAdmin } from "../../middleware/authenticate.js";

const loanRouter = express.Router();

/* ROTAS PRIVADAS (usuário autenticado) */
loanRouter.get("/", authenticate, listLoans);
loanRouter.get("/pendentes", authenticate, getPendingLoans);
loanRouter.get("/:id", authenticate, getLoanById);
loanRouter.get("/person/:personId", authenticate, getLoansByPerson);
loanRouter.get("/object/:objectId", authenticate, getLoansByObject);

/* ROTAS ADMINISTRATIVAS */
loanRouter.post("/", authenticate, authorizaAdmin, newLoan);
loanRouter.post("/update", authenticate, authorizaAdmin, update);
loanRouter.post("/devolver", authenticate, authorizaAdmin, returnLoan);
loanRouter.post("/delete", authenticate, authorizaAdmin, remove);

export default loanRouter;
