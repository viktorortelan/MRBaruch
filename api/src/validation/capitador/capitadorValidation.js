

export function validarCadastro(capitadorObj) {
    
    if(!capitadorObj.nome) 
        throw new Error("Nome é obrigatório.");
        
    if(!capitadorObj.email)
        throw new Error("Email é obrigatório.");
        
    if(!capitadorObj.telefone)
        throw new Error("Telefone é obrigatório.");
        
    if(!capitadorObj.cpf)
        throw new Error("CPF é obrigatório.");
        
    if(!capitadorObj.nascimento)
        throw new Error("Nascimento é obrigatório.");
        
    if(!capitadorObj.rua)
        throw new Error("Rua é obrigatório.");
        
    if(!capitadorObj.numero)
        throw new Error("Numero é obrigatório.");
        
    if(!capitadorObj.complemento)
        throw new Error("Complemento é obrigatório.");
        
    if(!capitadorObj.cep)
        throw new Error("CEP é obrigatório.");
        
    if(!capitadorObj.cidade)
        throw new Error("Cidade é obrigatório.");
        
    if(!capitadorObj.estado)
        throw new Error("Estado é obrigatório.");
               
    if(!capitadorObj.chave)
        throw new Error("Chave é obrigatório.");
        
    if(!capitadorObj.usuarioBanco)
        throw new Error("Nome de Usuario do banco é obrigatório.");
        
    if(!capitadorObj.nomeBanco)
        throw new Error("Nome do Banco é obrigatório.");
        

}

export function validarLogin(registros) {
    
    if(!registros[0])
        throw new Error("Crendeciais Inválidas");
        
    
}