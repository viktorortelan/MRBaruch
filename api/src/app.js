import express from "express";
import 'dotenv/config.js';
import cors from "cors";

import './utils/global.js'

import adicionarRotas from "./rotas.js";

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

adicionarRotas(servidor);

// servidor.get('/verificar/:email/:cpf', (req, resp) => {
//     const {email, cpf} = req.params;
//     let sql = `select*from tb_cadastro
//                where em_email = ?`

//     database.query(sql, [email], (err, result) => {
//         if (err) {
//             return resp.status(500).send(err);
//         }



//         if(result.length <= 0) {
//             resp.send({
//                 resp: 'credencias invalidas'
//             })
//         }
        
//         if(result.length > 0 ) {
//             let value = result[0];

//             if(value.cp_cpf_cnpj === cpf) {
//                resp.send({
//                 resp:"ta certo patrão"
//                })
//             } 
//             else{
//                resp.send({
//                 resp: "senha invalida"
//                })
//             }
//         }
//     })
// })

const PORTA = process.env.PORTA;
servidor.listen(PORTA, console.log('API subiu na porta ' + PORTA ));