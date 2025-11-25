import 'dotenv/config';
import express from "express";
import conectDB from "./database/db.js";
import userRouter from './modules/user/user.routes.js';
import collectionRouter from './modules/collection/collection.routes.js';
import objectRouter from './modules/object/object.routes.js';
import personRouter from './modules/person/person.routes.js';
import loanRouter from './modules/loan/loan.routes.js';
import collectionManagerRouter from './modules/collectionManager/collectionManager.routes.js';
import { authenticate, authorizaAdmin } from './middleware/authenticate.js';

const PORT = process.env.PORT;
const app = express();
app.use(express.json()); //necessário para receber json via API.

// Rotas de usuário
app.use('/user', userRouter);

// Rotas de coleções
app.use('/collections', collectionRouter);

// Rotas de objetos
app.use('/objects', objectRouter);

// Rotas de pessoas
app.use('/people', personRouter);

// Rotas de empréstimos
app.use('/loans', loanRouter);

// Rotas de gestores de coleção
app.use('/collectionManagers', collectionManagerRouter);

//esta função é assíncrona e vamos tratar a "Promisse"
conectDB()
    .then(()=>{ //se conectDB funcionar...
        app.listen(PORT,(erro)=>{
            if(!erro){
                console.log(`Servidor online. http://localhost:${PORT}/`)
            }else{
                console.log(`Não foi possível executar: ${erro}`)
            }
        }) 
    })
    .catch((erro)=>{
        console.log(`Erro de conexão com o database: ${erro}`);
    })

