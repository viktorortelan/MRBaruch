import './index.scss';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from 'local-storage';

import { toast } from 'react-toastify';
import { login } from '../../api/capitadorApi.js';




export default function Login() {
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    async function verificar() {
        try {
            const r = await login(email, cpf);
            storage('capitador-logado', r)

            toast.success("Logado com sucesso!");

            setTimeout(() => {
                navigate('/capitador')
              }, 1000)
            
        } 
        catch (err) {
            if(err.response)
                toast.error(err.response.data.erro);
            else 
                toast.error(err.message);
            
            if(err.response.status === 400) 
                setErro('Credenciais Invalidas')
          
        }
        


    }

    return (
        <div className="tela-login">
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
                            <h1>Log in</h1>

                            <div className="perguntas">
                                    <input type="text" placeholder='email'   value={email} onChange={e => setEmail(e.target.value)} />
                                    <input type="text"  placeholder='CPF ou CNPJ'   value={cpf} onChange={e => setCpf(e.target.value)}/>
                            </div>

                            

                            <button onClick={verificar}>Cadastrar</button>
                            
                        </div>

                </div>
           </div>

            <div className="risco"></div>
        </div>
    )
}

