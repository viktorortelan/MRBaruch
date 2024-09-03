import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5010'
});

export async function cadastro(nome, email, telefone, cpf, nascimento, rua, numero, complemento, cep, cidade, estado, chave, usuarioBanco, nomeBanco) {
    const r = await api.post('/cadastro', {
          nome: nome,
          email: email,
          telefone: telefone,
          cpf: cpf,
          nascimento: nascimento,
          rua: rua,
          numero: numero,
          complemento: complemento,
          cep: cep,
          cidade: cidade,
          estado: estado,
          chave: chave,
          usuarioBanco: usuarioBanco,
          nomeBanco: nomeBanco,
        });

    return r.data;  
}

export async function login(email, cpf) {
    const r = await api.post(`/login`, {
      email: email,
      cpf: cpf
    });
 
    return r.data;  
}
