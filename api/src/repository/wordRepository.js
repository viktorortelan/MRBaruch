import { AlignmentType, Document, Packer, Paragraph, TextRun, ImageRun, Header } from "docx";
import * as fs from "fs";

function loadImage(filePath) {
  return fs.readFileSync(filePath);
}

// Definindo constantes
const FONT = 'Arial';
const TITLE_SIZE = 36;
const SUBTITLE_SIZE = 24;
const BODY_SIZE = 22;
const SPACING_AFTER_TITLE = 600;
const SPACING_AFTER_TITLE_4 = 3600;
const SPACING_BEFORE_TITLE = 600;
const SPACING_AFTER_PARAGRAPH = 200;
const SPACING_AFTER_BULLET = 100;
const SPACING_AFTER_SECTION = 300;

function createImageParagraph(imageBuffer, text) {
  return new Paragraph({
    children: [
      new ImageRun({
        data: imageBuffer,
        transformation: { width: 250, height: 100 }, // Ajuste o tamanho conforme necessário
      }),
      new TextRun({
        text: text,
        font: FONT,
        size: BODY_SIZE,
        bold: true,
        spacing: { before: 100 }, // Espaçamento entre imagem e texto
      }),
    ],
    spacing: { after: 200 },
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: FONT,
      size: options.size || BODY_SIZE,
      bold: options.bold || false,
      italic: options.italic || false,
    })],
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: {
      before: options.spacingBefore || SPACING_BEFORE_TITLE,
      after: options.spacingAfter || SPACING_AFTER_PARAGRAPH
    },
    bullet: options.bullet || null,
  });
}

function createContratoParagraph(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: FONT,
      size: options.size || BODY_SIZE,
      bold: options.bold || false,
      italic: options.italic || false,
    })],
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: {
      after: 200
    },
    bullet: options.bullet || null,
  });
}

function createAssinature(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: FONT,
      size: options.size || BODY_SIZE,
      bold: options.bold || false,
      italic: options.italic || false,
    })],
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: {
      after: 600,
      before: 600
    },
    bullet: options.bullet || null,
  });
}

function createNumberedFinalParagraph(number, text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: number,
        font: FONT,
        size: BODY_SIZE,
        bold: true,
      }),
      new TextRun({
        text: text,
        font: FONT,
        size: BODY_SIZE,
      }),
    ],
    spacing: {
      after: 5000
    },
  });
}

function createBankParagraph(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: FONT,
      size: options.size || BODY_SIZE,
      bold: options.bold || true,
      italic: options.italic || false,
    })],
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: {
      before: 0,
      after: 0
    },
    bullet: options.bullet || null,
  });
}

function createNumberedParagraph(number, text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: number,
        font: FONT,
        size: BODY_SIZE,
        bold: true,
      }),
      new TextRun({
        text: text,
        font: FONT,
        size: BODY_SIZE,
      }),
    ],
    spacing: {
      after: 300
    },
  });
}

function createHeaderWithImage(imagePath) {
  // Lê a imagem e cria um buffer
  const imageBuffer = loadImage(imagePath);

  return new Header({
    children: [
      new Paragraph({
        children: [
          new ImageRun({
            data: imageBuffer,
            transformation: {
              width: 170, // Ajuste conforme necessário
              height: 78, // Ajuste conforme necessário
            },
          }),
        ],
        alignment: AlignmentType.LEFT, // Alinha a imagem ao centro
        spacing: {
          before: 0,
          after: 0,
        },
      }),
    ],
  });
}


export async function createWordDocument(clienteObj) {
  const { nomeCliente, cpfCliente, ruaCliente, cidadeCliente, cepCliente, valorServico, formaPagamento } = clienteObj;

  const doc = new Document({
    sections: [
      {
        properties: {},
        headers: {
          default: createHeaderWithImage('src/assets/images/logoMRBaruch.png'),
        },
        children: [
          

          createParagraph("CONTRATO DE PRESTAÇÃO DE SERVIÇOS", { size: TITLE_SIZE, bold: true, alignment: AlignmentType.CENTER, spacingAfter: SPACING_AFTER_TITLE }),

          createParagraph(`Pelo presente instrumento particular de contrato de prestação de serviços, de um lado, GRUPO MR BARUCH, inscrito no CNPJ: 31.406.396/0001-03, sediada na Avenida Presidente João Goulart, 2260 primeiro andar, São Paulo/SP - Bairro Jd. Guanhembu CEP: 04814-205 doravante simplesmente denominada de CONTRATADO, e de outro lado, ${nomeCliente}, inscrito no CPF: ${cpfCliente} residente na Rua ${ruaCliente}, Cidade: ${cidadeCliente}, CEP: ${cepCliente} simplesmente denominado de CONTRATANTE, convencionam e contratam o seguinte:`),

          createParagraph("CLÁUSULA PRIMEIRA – DAS OBRIGAÇÕES DO CONTRATADO", { size: SUBTITLE_SIZE, bold: true, spacingAfter: 300, spacingBefore: SPACING_BEFORE_TITLE }),

          createNumberedParagraph("1.1 - ", "Obriga-se a prestar seus serviços profissionais na defesa dos direitos do CONTRATANTE na ação de exclusão de apontamentos nos órgãos de proteção ao crédito (SERASA, SPC, e BOA VISTA).", {spacing: { before: 300, after: 300 }}),
          createNumberedParagraph("1.2 - ", "Restauração do score para aumentar a pontuação.", {spacing: { before: 300, after: 300 }}),
          createNumberedParagraph("1.3 - ", "Atualização nos órgãos de proteção ao crédito.", {spacing: { before: 300, after: 300 }}),
          createNumberedParagraph("1.4 - ", "O contratado deverá entregar a efetivação da reabilitação de crédito (nada consta) em até 45 dias úteis após a assinatura do contrato e pagamento pela contratação do serviço.", {spacing: { before: 300, after: 300 }}),

          createParagraph("CLÁUSULA SEGUNDA – DAS OBRIGAÇÕES DA CONTRATANTE", { size: SUBTITLE_SIZE, bold: true, spacingAfter: 300, spacingBefore: SPACING_BEFORE_TITLE }),

          createNumberedParagraph("2.1 - ", `Em virtude da remuneração dos serviços descritos na cláusula anterior, a CONTRATANTE pagará ao CONTRATADO o montante de R$${valorServico}.`, {spacing: { before: 300, after: 200 }}),
          createNumberedParagraph("2.2 - ", `O pagamento deverá ser efetuado na seguinte forma: ${formaPagamento}.`, {spacing: { before: 0, after: 200 }}),
          createNumberedParagraph("2.3 - ", "O(a) CONTRATANTE deverá realizar o pagamento para a CONTRATADA via depósito / transferência bancária do valor integral constante do Item 2.1 para a seguinte conta ou em outra indicada, expressamente, pela CONTRATADA ou na forma descrita na cláusula 2.2", {spacing: { before: 0, after: 200 }}),

          createBankParagraph("• Santander"),
          createBankParagraph("• AG: 0662 - Conta Corrente: 00013008192-2"),
          createBankParagraph("• CNPJ 31.406.396/0001-03"),
          createBankParagraph("• Itaú"),
          createBankParagraph("• AG: 9340 - Conta corrente: 32634-8"),
          createBankParagraph("• Pix / CPF 37149194818 Michel da Silva Rodrigues"),

          createParagraph("CLÁUSULA TERCEIRA – RESCISÃO DE CONTRATO", { size: SUBTITLE_SIZE, bold: true, spacingAfter: SPACING_AFTER_SECTION }),

          createNumberedParagraph("3.1 – ", "Em caso de quebra de contrato a contratante deverá arcar com as custas do serviço referente a 80% do valor citado na cláusula 2.1.", {spacing: { before: 0, after: 300 }}),

          createParagraph("CLÁUSULA QUARTA – NÃO OBRIGAÇÕES DA CONTRATADA", { size: SUBTITLE_SIZE, bold: true, spacingAfter: SPACING_AFTER_TITLE, spacingAfter: SPACING_BEFORE_TITLE }),

          createNumberedFinalParagraph("4.1 – ", "A contratada não é responsável por nenhum tipo de liberação de crédito à contratante.", { bold: true}),

          createContratoParagraph("Local, Data", { alignment: AlignmentType.LEFT, spacing: {before: 200} }),
          createContratoParagraph("São Paulo 21 de Julho de 2022", { alignment: AlignmentType.LEFT, spacing: {before: 200}  }),
          createContratoParagraph("Nome do Contratante", { alignment: AlignmentType.LEFT, spacing: {before: 200}  }),
          createAssinature("_______________________________", { alignment: AlignmentType.LEFT}),
          createContratoParagraph("Contratado", { alignment: AlignmentType.LEFT }),
          createContratoParagraph("Grupo MR Baruch", { alignment: AlignmentType.LEFT, spacing: {before: 200}  }),
          createAssinature("_______________________________", { alignment: AlignmentType.LEFT}),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}