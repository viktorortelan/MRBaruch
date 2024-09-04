import { buscarDadosClientePeloCpf } from "../../repository/clienteRepository.js";

export default async function buscarDadosClientePeloCpfService(cpf) {
  
  let resp = await buscarDadosClientePeloCpf(cpf);
  return resp[0];

}