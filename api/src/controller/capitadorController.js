import { Router } from "express";

import cadastroCapitadorService from "../service/capitador/cadastroCapitadorService.js";
import loginCapitadorService from "../service/capitador/loginCapitadorService.js";

const endpoints = Router();

endpoints.post('/cadastro', async (req, resp) => {

    try {
        
        let capitadorObj = req.body;
        
        let id = await cadastroCapitadorService(capitadorObj);
        resp.send({
            id: id
        })

    } 
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err))
    }

})

endpoints.post('/login', async (req, resp) => {

    try {
        
        let {email, cpf} = req.body;

        let x = await loginCapitadorService(email, cpf);

        resp.send(x);

    } 
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err))
    }

})





export default endpoints;