create database DB_captador;
use DB_captador;



#ir no explorador de arquivos (windows + E) e colar essa url C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/ e colar o arquivo da planilha.csv que o caminho que der

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/leads.csv'
INTO TABLE tb_cliente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(telefone, CPF_CNPJ_cliente, @codigo, @data_atendimento, nome, preenchimento_manual_cpf_cnpj_cliente, atendente, 
status_atendimento, servico_contratado, @valor_total_servico, @valor_primeira_entrada, @data_primeira_entrada, 
@cliente_dividiu_entrada, @valor_segunda_entrada, @data_segunda_entrada, @parcelou_contrato, forma_parcelamento, 
forma_pagamento, @quantidade_parcelas, @valor_parcelas, @primeira_parcela)
SET 
  codigo = NULLIF(@codigo, ''),
  data_atendimento = IF(@data_atendimento REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{4}$', STR_TO_DATE(@data_atendimento, '%d/%m/%Y'), NULL),
  valor_total_servico = IF(@valor_total_servico = '' OR @valor_total_servico IS NULL, 0, 
                           CAST(REPLACE(REPLACE(REPLACE(TRIM(@valor_total_servico), 'R$', ''), '.', ''), ',', '.') AS DECIMAL(10,2))),
  valor_primeira_entrada = IF(@valor_primeira_entrada = '' OR @valor_primeira_entrada IS NULL, 0, 
                              CAST(REPLACE(REPLACE(REPLACE(TRIM(@valor_primeira_entrada), 'R$', ''), '.', ''), ',', '.') AS DECIMAL(10,2))),
  data_primeira_entrada = IF(@data_primeira_entrada REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{4}$', STR_TO_DATE(@data_primeira_entrada, '%d/%m/%Y'), NULL),
  cliente_dividiu_entrada = CASE 
                            WHEN @cliente_dividiu_entrada = 'Sim' THEN 1 
                            WHEN @cliente_dividiu_entrada = 'Não' THEN 0 
                            ELSE NULL 
                          END,
  valor_segunda_entrada = IF(@valor_segunda_entrada = '' OR @valor_segunda_entrada IS NULL, 0, 
                             CAST(REPLACE(REPLACE(REPLACE(TRIM(@valor_segunda_entrada), 'R$', ''), '.', ''), ',', '.') AS DECIMAL(10,2))),
  data_segunda_entrada = IF(@data_segunda_entrada REGEXP '^[0-9]{2}/[0-9]{2}/[0-9]{4}$', STR_TO_DATE(@data_segunda_entrada, '%d/%m/%Y'), NULL),
  parcelou_contrato = CASE 
                      WHEN @parcelou_contrato = 'Sim' THEN 1 
                      WHEN @parcelou_contrato = 'Não' THEN 0 
                      ELSE NULL 
                    END,
  quantidade_parcelas = NULLIF(@quantidade_parcelas, ''),
  valor_parcelas = IF(@valor_parcelas = '' OR @valor_parcelas IS NULL, 0, 
                      CAST(REPLACE(REPLACE(REPLACE(TRIM(@valor_parcelas), 'R$', ''), '.', ''), ',', '.') AS DECIMAL(10,2))),
  primeira_parcela = IF(@primeira_parcela = '' OR @primeira_parcela IS NULL, 0, 
                        CAST(REPLACE(REPLACE(REPLACE(TRIM(@primeira_parcela), 'R$', ''), '.', ''), ',', '.') AS DECIMAL(10,2)));

                        
                        




SELECT * FROM tb_cliente;

INSERT INTO tb_cliente (telefone, CPF_CNPJ_cliente, codigo, data_atendimento, nome, preenchimento_manual_cpf_cnpj_cliente, atendente, 
status_atendimento, servico_contratado, valor_total_servico, valor_primeira_entrada, data_primeira_entrada, cliente_dividiu_entrada, 
valor_segunda_entrada, data_segunda_entrada, parcelou_contrato, forma_parcelamento, forma_pagamento, quantidade_parcelas, valor_parcelas, primeira_parcela)
VALUES ('123456789', '12345678901', '123', '2024-09-01', 'Cliente Exemplo', 'Sim', 'Atendente Exemplo', 'Ativo', 'Serviço Exemplo', 
1000.00, 200.00, '2024-09-01', 1, 300.00, '2024-10-01', 1, 'Parcelado', 'Boleto', 3, 100.00, 200.00);






#comando pra ver a url
SHOW VARIABLES LIKE 'secure_file_priv';

SHOW GLOBAL VARIABLES LIKE 'local_infile';

# usar esse comando uma vez 
SET GLOBAL local_infile = 1;




-- função usada para ver as denpendencias da tabela, caso algo esteja errado, de um alte ou um modufy...
DESCRIBE tb_cliente;


--se for preciso, execute esses todos antes de executar a mãe...
ALTER TABLE tb_cliente
MODIFY data_atendimento DATE NULL,
MODIFY data_primeira_entrada DATE NULL,
MODIFY data_segunda_entrada DATE NULL;
ALTER TABLE tb_cliente 
MODIFY valor_total_servico DECIMAL(10,2),
MODIFY valor_primeira_entrada DECIMAL(10,2),
MODIFY valor_segunda_entrada DECIMAL(10,2),
MODIFY valor_parcelas DECIMAL(10,2),
MODIFY primeira_parcela DECIMAL(10,2);
ALTER TABLE tb_cliente MODIFY primeira_parcela DECIMAL(10, 2);
ALTER TABLE tb_cliente MODIFY COLUMN cliente_dividiu_entrada VARCHAR(10);
ALTER TABLE tb_cliente MODIFY COLUMN parcelou_contrato VARCHAR(10);
ALTER TABLE tb_cliente ADD contrato VARCHAR(255);
ALTER TABLE tb_cliente MODIFY codigo VARCHAR(255);
ALTER TABLE tb_cliente MODIFY valor_total_servico DECIMAL(10, 2) NULL;
ALTER TABLE tb_cliente MODIFY cliente_dividiu_entrada INT NULL;
ALTER TABLE tb_cliente MODIFY valor_segunda_entrada DECIMAL(10, 2) NULL;
ALTER TABLE tb_cliente MODIFY data_segunda_entrada DATE NULL;
ALTER TABLE tb_cliente MODIFY parcelou_contrato INT NULL;
ALTER TABLE tb_cliente MODIFY quantidade_parcelas INT NULL;

create table tb_cadastro(
id_cadastro int primary key auto_increment,
nm_nome varchar(255) not null,
em_email varchar(250) unique,
tl_telefone varchar(255) unique,
cp_cpf_cnpj varchar(250) unique,
dt_nascimento date,
nm_rua varchar(250),
nu_casa varchar(255),
co_complemento varchar(200),
cp_cep varchar(200),
cd_cidade varchar(200),
es_estado varchar(250),
ch_pix varchar(250) unique,
us_banco varchar(250),
nm_banco varchar(250)
);

select*from tb_cadastro;

CREATE TABLE tb_cliente (
	id_cliente int primary key auto_increment,
    telefone VARCHAR(15),
	CPF_CNPJ_cliente VARCHAR(18),
    codigo INT,
    data_atendimento DATE,
    nome VARCHAR(255),
    preenchimento_manual_cpf_cnpj_cliente VARCHAR(18),
    atendente VARCHAR(255),
    status_atendimento VARCHAR(50),
    servico_contratado VARCHAR(255),
    valor_total_servico DECIMAL(10, 2),
    valor_primeira_entrada DECIMAL(10, 2),
    data_primeira_entrada DATE,
    cliente_dividiu_entrada BOOLEAN,
    valor_segunda_entrada DECIMAL(10, 2),
    data_segunda_entrada DATE,
    parcelou_contrato BOOLEAN,
    forma_parcelamento VARCHAR(255),
    forma_pagamento VARCHAR(50),
    quantidade_parcelas INT,
    valor_parcelas DECIMAL(10, 2),
    primeira_parcela DATE
);

select*from tb_cliente;

select*from tb_cadastro;


CREATE TABLE atendimentos (
    telefone VARCHAR(20),
    cpf_cnpj_cliente VARCHAR(20),
    codigo VARCHAR(50),
    data_atendimento DATE,
    nome VARCHAR(100),
    preenchimento_manual_cpf_cnpj VARCHAR(20),
    atendente VARCHAR(100),
    status_atendimento VARCHAR(50),
    servico_contratado VARCHAR(100),
    valor_total_servico DECIMAL(10, 2),
    valor_primeira_entrada DECIMAL(10, 2),
    data_primeira_entrada DATE,
    cliente_dividiu_entrada BOOLEAN,
    valor_segunda_entrada DECIMAL(10, 2),
    data_segunda_entrada DATE,
    parcelou_restante_contrato BOOLEAN,
    forma_parcelamento VARCHAR(50),
    forma_pagamento VARCHAR(50),
    quantidade_parcelas INT,
    valor_parcelas DECIMAL(10, 2),
    primeira_parcela DATE
);

GRANT ALL PRIVILEGES ON meu_banco.* TO 'root'@'localhost';

FLUSH PRIVILEGES;

SHOW GRANTS FOR 'root'@'localhost';

select*from atendimentos;








#mostra o total de linhas afetadas na hora que puxa da planilha
SELECT COUNT(*) AS total_rows FROM tb_cliente;

        
        select  nm_nome nome,
                em_email email,
                cp_cpf_cnpj cpf
        from    tb_cadastro
        where   em_email = 'joaopedro@gmail.com'
        and     cp_cpf_cnpj = '12';