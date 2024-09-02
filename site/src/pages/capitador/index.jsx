import { useEffect, useState } from 'react';
import './index.scss'

import axios from 'axios';

export default function Capitador() {
    
    const [servico, setServico] = useState([]);
    let x = valorComissao();


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

    useEffect(() => {
        listarServico();
    }, [])

    async function listarServico() {
        
        let url = 'http://localhost:5010/servico/44887017871';
        let response = await axios.get(url);

        console.log(response.data);

        let listaServico = []

        for (let item of response.data) {
        
            listaServico.push({
                id: item.id,
                cpf: item.cpfCapitadorServico,
                nome: item.nome,
                valor: item.valorServico
            })

        }

        setServico(listaServico);

    }

    return(
        <div className='pagina-Capitador'>
            <img src="/assets/images/MR-Baruch-Logo.png" alt="logo" />
            
            <div className="section">
            <div className="texto">
                 <h1>Seja bem-vindo(a), { }</h1>
                 <p>Fique de olho na sua jornada como um(a) capitador(a), aqui você tem todas informações dos clientes que você chamou</p>
            </div>
            </div>
            
            <div className="table">
                <table className=' tabela'>

                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Capitador</th>
                            <th>cliente</th>
                            <th>Status</th>
                            <th>comissão</th>
                         </tr>
                    </thead>
                    
                    <tbody>
                        {servico.map(item =>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.cpf}</td>
                            <td>{item.nome}</td>
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
        </div>
    );

}

