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
id_cliente 					id,
ds_telefone					telefone,		
ds_cpf_cnpj 				cpfCliente,		
nm_cliente					nome,			
ds_cpf_capitador			cpfCapitadorServico,		
ds_servico					servico,			
dt_contrato					contrato,			
nr_valor_servico			valorServico,	
ds_forma_pagamento			formaPagamento,	
nr_parcelas					parcelas,			
nr_valor_parcela			valorParcela,	
nr_valor_entrada			valorEntrada,	
nr_valor_total_recebido		valorRecebido
from tb_cliente
where ds_cpf_capitador = ?;
  `

  let resp = await con.query(comando, [cpfCapitador]);
  return resp[0];

}