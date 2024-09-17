import { Router } from "express";
import { cadastros } from "../repository/capitadorRepository.js";
import cadastroCapitadorService from "../service/capitador/cadastroCapitadorService.js";
import loginCapitadorService from "../service/capitador/loginCapitadorService.js";
import listarServicoPeloCpfCapitadorService from "../service/capitador/listarServicoPeloCpfCapitador.js";

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

endpoints.get('/servico/:cpf', async (req, resp) => {

  try {
    
    let cpf = req.params.cpf;

    let x = await listarServicoPeloCpfCapitadorService(cpf);
    resp.send(x);

  }
  catch (err) {
    logErro(err);
    resp.status(400).send(criarErro(err))
}

})


endpoints.get('/mostrar', async (req,resp) =>{
    let registro = await cadastros();
    resp.send(registro);
})


export default endpoints;