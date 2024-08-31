import './index.scss';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {cadastro} from '../../api/capitadorApi.js'

import { toast } from 'react-toastify';



export default function Cadastro() {
const [nome, setNome] = useState('');
const [email, setEmail] = useState('')
const [telefone, setTelefone] = useState('')
const [cpf, setCpf] = useState('')
const [nascimento, setNascimento] = useState('')
const [rua, setRua] = useState('')
const [numero, setNumero] = useState('')
const [complemento, setComplemento] = useState('')
const [cep, setCep] = useState('')
const [cidade, setCidade] = useState('')
const [estado, setEstado] = useState('')
const [pix, setPix] = useState('')
const [usuario, setUsuario] = useState('')
const [banco, setBanco] = useState('')
const [erro, setErro] = useState('');

const navigate = useNavigate();

async function entrarClick() {

    try {
      const r = await cadastro(nome, email, telefone, cpf, nascimento, rua, numero, complemento, cep, cidade, estado, pix, usuario, banco)

      setTimeout(() => {
        navigate('/login')
      }, 3000)

      
    } catch (err) {

        if(err.response)
            toast.error(err.response.data.erro);
        else 
            toast.error(err.message);
    }
  }


return (
    <div className="tela-cadastro">

           <div className="tela">
                <div className="esquerda">
                    <img src="/assets/images/MR-Baruch-Logo.png" alt="banner da empresa" />

                        <div className="textos">
                            <h1>Se cadastre para ser um Capitador(a)</h1>
                            <p>Mude sua vida virando um captador, ganhando mais que um salário mínimo por semana</p>
                        </div>

                </div>

                <div className="direita">

                        <div className="cartao">
                            <h1>Cadastro</h1>

                            <div className="perguntas">
                                <div className="um">
                                    <input type="text" placeholder='nome completo' value={nome} onChange={e => setNome(e.target.value)}/>
                                    <input type="text" placeholder='email'   value={email} onChange={e => setEmail(e.target.value)} />
                                    <input type="text"  placeholder='telefone'   value={telefone} onChange={e => setTelefone(e.target.value)}/>
                                    <input type="text"  placeholder='CPF ou CNPJ'   value={cpf} onChange={e => setCpf(e.target.value)}/>
                                    <input type='date'  placeholder='data de nascimento'   value={nascimento} onChange={e => setNascimento(e.target.value)}/>
                                    <input type="text"  placeholder='chave pix'  value={pix} onChange={e => setPix(e.target.value)}/>
                                    <input type="text" placeholder='Banco' value={banco} onChange={e => setBanco(e.target.value)} />
                                </div>

                                <div className="um">
                                    <input type="text" placeholder='rua' value={rua} onChange={e => setRua(e.target.value)}/>
                                    <input type="text" placeholder='número'   value={numero} onChange={e => setNumero(e.target.value)}/>
                                    <input type="text" placeholder='complemento'   value={complemento} onChange={e => setComplemento(e.target.value)}/>
                                    <input type="text" placeholder='CEP'  value={cep} onChange={e => setCep(e.target.value)}/>
                                    <input type="text" placeholder='cidade'   value={cidade} onChange={e => setCidade(e.target.value)}/>
                                    <input type="text"  placeholder='Estado'   value={estado} onChange={e => setEstado(e.target.value)}/>
                                    <input type="text"  placeholder='nome na conta'   value={usuario} onChange={e => setUsuario(e.target.value)}/>
                                    
                                </div>

                            </div>
                                
                            <button onClick={entrarClick}>Cadastrar</button>

                        </div>

                </div>
           </div>

            <div className="risco"></div>
        </div>
    )
}