import { listarServicoPeloCpfCapitador } from "../../repository/capitadorRepository.js";

export default async function listarServicoPeloCpfCapitadorService(cpf) {
  
  let resp = await listarServicoPeloCpfCapitador(cpf);
  return resp;

}