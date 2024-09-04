import express from "express";

import capitadorController from './controller/capitadorController.js'
import wordController from './controller/wordController.js'
import clienteController from './controller/clienteController.js'

export default function adicionarRotas(servidor) {
    
    servidor.use(capitadorController);
    servidor.use(wordController);
    servidor.use(clienteController);

}