import express from "express";
import { generateWordFile } from "../service/word/wordService.js";

const endpoints = express.Router();

endpoints.post('/generate-word/:cpf', async (req, resp) => {
  try {
    const cpf = req.params.cpf;

    const buffer = await generateWordFile(cpf);

    resp.setHeader("Content-Disposition", "attachment; filename=Minuta de Contrato.docx");
    resp.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    resp.send(buffer);
  } catch (err) {
    console.error(err); // Exemplo de log de erro
    resp.status(400).send({ error: "Erro ao gerar o documento Word." });
  }
});

export default endpoints;