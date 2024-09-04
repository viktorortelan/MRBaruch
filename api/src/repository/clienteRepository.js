import con from "./connection.js";

export async function buscarDadosClientePeloCpf(cpf) {
  
  let comando = `
    select 	id_cliente 			id,
		ds_telefone 		telefoneCliente,
        ds_cpf_cnpj 		cpfCliente,
        nm_cliente 			nomeCliente,
        ds_cpf_capitador 	cpfCapitador,
        ds_servico			servico,
        dt_contrato			dataContrato,
        nr_valor_servico	valorServico,
        ds_forma_pagamento	formaPagamento
    from 	tb_cliente
    where 	ds_cpf_cnpj = ?;
  `

  let resp = await con.query(comando, [cpf]);
  return resp[0];

}