import con from "./connection.js";

export async function cadastroCapitador(capitadorObj) {
    
    let comando = `
        INSERT INTO tb_cadastro (nm_nome, em_email, tl_telefone, cp_cpf_cnpj, dt_nascimento, nm_rua, nu_casa, co_complemento, cp_cep, cd_cidade, es_estado, ch_pix, us_banco, nm_banco) 
                          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `

    let resp = await con.query(comando, [capitadorObj.nome, capitadorObj.email , capitadorObj.telefone, capitadorObj.cpf, capitadorObj.nascimento, capitadorObj.rua, capitadorObj.numero, capitadorObj.complemento, capitadorObj.cep, capitadorObj.cidade, capitadorObj.estado, capitadorObj.chave, capitadorObj.usuarioBanco, capitadorObj.nomeBanco]);
    let info = resp[0];
    let idCapitador = info.insertId;
    return idCapitador;
}

export async function loginCapitador(email, cpf) {
    
    let comando = `
        select  nm_nome nome,
                em_email email,
                cp_cpf_cnpj cpf
        from    tb_cadastro
        where   em_email = ?
        and     cp_cpf_cnpj = ?
    `

    let resp = await con.query(comando, [email, cpf]);
    return resp[0];

}

export async function listarServicoPeloCpfCapitador(cpfCapitador) {
  
  let comando = `
    select 
        id_cliente,
        telefone,		
        CPF_CNPJ_cliente,		
        codigo,			
        data_atendimento,		
        nome,			
        preenchimento_manual_cpf_cnpj_cliente,			
        atendente,	
        valor_primeira_entrada,	
        data_primeira_entrada,			
        cliente_dividiu_entrada,	
        valor_segunda_entrada,	
        data_segunda_entrada,
        parcelou_contrato,
        forma_parcelamento,
        forma_pagamento,
        quantidade_parcelas,
        valor_parcelas,
        primeira_parcela
    from tb_cliente where codigo = ?;
`;

  let resp = await con.query(comando, [cpfCapitador]);
  return resp[0];

}


export async function cadastros() {
  let comando = `
    select*from tb_cadastro;
  ` ;

  let registro = await con.query(comando);
  let info = registro[0];
  return info;
}