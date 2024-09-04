import { Router } from "express";
import buscarDadosClientePeloCpfService from "../service/cliente/buscarDadosClientePeloCpfService.js";

const endpoints = Router();

endpoints.get('/cliente/:cpf', async (req, resp) => {

  try {
  
    let cpf = req.params.cpf;

    let x = await buscarDadosClientePeloCpfService(cpf);
    resp.send(x);

  }
  catch (err) {
    logErro(err);
    resp.status(400).send(criarErro(err))
  }

})








export default endpoints;