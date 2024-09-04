import { createWordDocument } from "../../repository/wordRepository.js";
import { buscarDadosClientePeloCpf } from "../../repository/clienteRepository.js";

export async function generateWordFile(cpf) {
  
  let clienteObj = await buscarDadosClientePeloCpf(cpf);
  clienteObj = clienteObj[0];

  const buffer = await createWordDocument(clienteObj);
  return buffer;
  
}