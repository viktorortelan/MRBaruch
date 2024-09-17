import con from "./connection.js";

export async function buscarDadosClientePeloCpf(cpf) {
  
  let comando = `
    SELECT * 
    FROM tb_cliente 
    WHERE cpf_cnpj_cliente = ?;
  `

  let resp = await con.query(comando, [cpf]);
  return resp[0];

}


export async function clientes(telefone, cpf) {
  let comando = `
    select*from tb_cliente
  `
}