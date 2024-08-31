import express from "express";

import capitadorController from './controller/capitadorController.js'

export default function adicionarRotas(servidor) {
    
    servidor.use(capitadorController);

}