import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from 'local-storage';
import './index.scss'

import axios from 'axios';

export default function Capitador() {
    
    const [servico, setServico] = useState([]);
    const [usuario, setUsuario] = useState('-');
    const [cpf, setCpf] = useState('-');
    const [cpfCliente, setCpfCliente] = useState('');
    
    let x = valorComissao();
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if(storage('capitador-logado')) {
            navigate('/capitador')
            const usuarioLogado = storage('capitador-logado');
            setUsuario(usuarioLogado.nome);
            setCpf(usuarioLogado.cpf)
        } else {
            navigate('/login')
        }
    }, [])
    
    useEffect(() => {
        if (cpf !== '-') {  // Executa apenas se o CPF não for o valor inicial
            listarServico();
        }
    }, [cpf]);

    function valorComissao() {
        
        let valores = servico;
        let valor = 0;

        for (let item of valores) {
            let comissao = item.valor;

            comissao = comissao.replaceAll(' ', '');
            comissao = Number(comissao);
            valor += comissao; 
            
            
        }

        return valor;

    }


    async function gerarContrato() {
        
        try {
            let url = 'http://localhost:5010/generate-word/' + cpfCliente;
            let response = await axios.post(url, null, { // Corrigido para incluir null como payload
                responseType: 'blob' // Configura o Axios para tratar a resposta como um arquivo binário (blob)
            });
    
            // Criar um Blob com os dados recebidos e definir o tipo de conteúdo
            const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
    
            // Criar uma URL para o Blob
            const fileUrl = URL.createObjectURL(fileBlob);
    
            // Criar um elemento de download e clicar automaticamente
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', 'contrato.docx'); // Defina o nome do arquivo
            document.body.appendChild(link);
            link.click();
    
            // Limpar após o download
            link.remove();
            URL.revokeObjectURL(fileUrl);
    
        } catch (error) {
            console.error('Erro ao gerar o contrato:', error);
        }


    }

    async function listarServico() {
        
        let url = 'http://localhost:5010/servico/' + cpf;
        let response = await axios.get(url);

        console.log(response.data);

        let listaServico = []

        for (let item of response.data) {
        
            listaServico.push({
                id: item.id,
                cpf: item.cpfCapitadorServico,
                nome: item.nome,
                valor: item.valorServico,
                cpfCliente: item.cpfCliente
            })

        }
        
        setServico(listaServico);

    }

    function sairClick() {
        storage.remove('capitador-logado');
        navigate('/login');
    }

    function primeiroNome(nome) {
        
        let a = nome.substring(0, nome.indexOf(" "));
        return a;

    }

    return(
        <div className='pagina-Capitador'>
            <div className="cabecalho">
                <img src="/assets/images/MR-Baruch-Logo.png" alt="logo" />
                <button onClick={sairClick}>Sair</button>
            </div>

            <div className="section">
            <div className="texto">
                 <h1>Seja bem-vindo(a), {usuario}</h1>
                 <p>Fique de olho na sua jornada como um(a) capitador(a), aqui você tem todas informações dos clientes que você chamou</p>
            </div>
            </div>
            
            <div className="table">
                <table className=' tabela'>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Capitador</th>
                            <th>Nome Cliente</th>
                            <th>Cpf Cliente</th>
                            <th>Status</th>
                            <th>Comissão</th>
                         </tr>
                    </thead>
                    
                    <tbody>
                        {servico.map(item =>
                        <tr>
                            <td>{item.id}</td>
                            <td>{primeiroNome(usuario)}</td>
                            <td>{item.nome}</td>
                            <td>{item.cpfCliente}</td>
                            <td>vendido</td>
                            <td>{item.valor}</td>
                        </tr>

                        )}
                    </tbody>
                    
                </table>
            </div>


            <div className="section2">
                <div className="card">
                    <h1>Sua comissão total é de : {x} </h1>
                </div>
            </div>

            <div className='section3'>
                <input type="text" placeholder='Insira o CPF do cliente' value={cpfCliente} onChange={e => setCpfCliente(e.target.value)} name="" id="" />
                <button onClick={gerarContrato}>👉</button>
            </div>

        </div>
    );

}

