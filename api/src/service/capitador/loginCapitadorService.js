import { loginCapitador } from "../../repository/capitadorRepository.js";
import { validarLogin } from "../../validation/capitador/capitadorValidation.js";

export default async function loginCapitadorService(email, cpf) {
    
    
    
    let resp = await loginCapitador(email, cpf);
    if(!email)
        throw new Error("Email é obrigatório");
    if(!cpf)
        throw new Error("CPF ou CNPJ é obrigatório");
    
    validarLogin(resp);
        
    return resp[0];
}