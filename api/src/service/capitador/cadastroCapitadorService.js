import { cadastroCapitador } from "../../repository/capitadorRepository.js";
import { validarCadastro } from "../../validation/capitador/capitadorValidation.js";

export default async function cadastroCapitadorService(capitadorObj) {
    
    validarCadastro(capitadorObj);

    let id = await cadastroCapitador(capitadorObj);
    return id;

}