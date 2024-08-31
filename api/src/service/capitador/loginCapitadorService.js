import { loginCapitador } from "../../repository/capitadorRepository.js";
import { validarLogin } from "../../validation/capitador/capitadorValidation.js";

export default async function loginCapitadorService(email, cpf) {
    
    let resp = await loginCapitador(email, cpf);

    validarLogin(resp);
        
    return resp[0];
}