CREATE DATABASE IF NOT EXISTS asipeca;
use asipeca;

create table Unidade(
	id_uni int primary key auto_increment,
    nome varchar(100) not null,
    endereco varchar(200) not null,
    telefone varchar(15) not null
);

create table Recepcionista(
	id_rece int primary key auto_increment,
    id_uni int not null,
	nome varchar(100) not null,
    email varchar(100) not null,
    cpf varchar(30) not null UNIQUE,
    telefone varchar(15) not null,
    constraint fk_recepcionista_unidade
    foreign key (id_uni)
    references unidade(id_uni)
);


create table Responsavel(
	id_res int primary key auto_increment,
    nome varchar(100) not null,
    cpf varchar(30) not null UNIQUE,
    telefone varchar(15) not null,
    email varchar(100) not null

);

create table paciente (
	id_paci int primary key auto_increment,
    id_res int not null,
    nome varchar(100) not null,
    cpf varchar(30) not null UNIQUE,
    data_nascimento date not null,
    tipo_atendimento varchar(30) not null,
    
    constraint fk_responsavel_paciente
    foreign key (id_res)
    references responsavel(id_res),
    
    CONSTRAINT uk_paciente_responsavel
	UNIQUE (id_paci, id_res)
);

create table Terapeuta(
	id_te int primary key auto_increment,
    id_uni int not null,
    nome varchar(100) not null,
    cpf varchar(30) not null UNIQUE,
    telefone varchar(15) not null,
    email varchar(100) not null,
    constraint fk_terapeuta_unidade
    foreign key(id_uni)
    references unidade(id_uni)

);

create table disponibilidade(
	id_disponibilidade int primary key auto_increment,
    dia_semana varchar(25) not null,
	hora_inicio time not null,
    hora_fim time not null,
    id_te int not null,
    
    constraint fk_disponibilidade_terapeuta
    foreign key (id_te)
    references Terapeuta(id_te),
    
    constraint veri_horario_disponibilidade
    check (hora_fim > hora_inicio)
    
);

create table especialidade(
	id_especi int primary key auto_increment,
	nome varchar(100) not null

);

create table terapeuta_especialidade(

	id_te int not null,
	id_especi int not null,

	PRIMARY KEY (id_te, id_especi),
    
    constraint fk_te_terapeuta
    foreign key(id_te)
    references Terapeuta(id_te),
    
    constraint fk_especi_especialidade
    foreign key (id_especi)
    references especialidade(id_especi)
);



create table Sala(
	id_sal int primary key auto_increment,
    id_uni int not null,
    numero_sal int not null,
    
	constraint fk_unidade_sala
     foreign key (id_uni)
     references Unidade(id_uni)
);


create table Agendamento(
	id_agen int primary key auto_increment,
    hora_inicio time not null, 
    hora_fim time not null,
    data_agendamento date not null,
    stats  varchar(30) NOT NULL, 
    
    constraint veri_horario_agendamento
    check (hora_fim > hora_inicio),
	
	id_rece int not null,
    constraint fk_agendamento_recepcionista
    foreign key (id_rece)
    references Recepcionista(id_rece),
    
    id_te int not null,
    constraint fk_terapeuta_agendamento
    foreign key (id_te)
    references terapeuta(id_te),
    
    id_paci int not null,
    constraint fk_paciente_agendamento
    foreign key(id_paci)
    references paciente(id_paci),
    
    id_res int not null,
    constraint fk_responsavel_agendamento
    foreign key (id_res)
    references responsavel(id_res),
    
    id_especi int not null,
    constraint fk_especialidade_agendamento
    foreign key (id_especi)
    references especialidade(id_especi),
    
    CONSTRAINT fk_agendamento_paciente_responsavel
	FOREIGN KEY (id_paci, id_res)
	REFERENCES paciente(id_paci, id_res),
    
    CONSTRAINT fk_agendamento_terapeuta_especialidade
	FOREIGN KEY (id_te, id_especi)
	REFERENCES terapeuta_especialidade(id_te, id_especi),
    
    id_sal int not null,
    constraint fk_agendamento_sala
    foreign key (id_sal)
    references Sala(id_sal),
    
    id_uni int not null,
    constraint fk_agendamento_unidade
    foreign key(id_uni)
    references unidade(id_uni)
);

use asipeca;

INSERT INTO Unidade (id_uni, nome, endereco, telefone) VALUES
(default, 'Unidade Central', 'Rua das Flores, 100', '(15) 3333-1000'),
(default, 'Unidade Norte', 'Avenida Brasil, 250', '(15) 3333-2000');


INSERT INTO Recepcionista
(id_rece, id_uni, nome, email, cpf, telefone) VALUES
(default, 1, 'Mariana Costa', 'mariana@email.com', 'CPF-FICTICIO-001', '(15) 99999-1001'),
(default, 2, 'Lucas Almeida', 'lucas@email.com', 'CPF-FICTICIO-002', '(15) 99999-1002');
DESCRIBE Recepcionista;



INSERT INTO Responsavel
(id_res, nome, cpf, telefone, email) VALUES
(1, 'Carlos Mendes', 'CPF-FICTICIO-003', '(15) 99999-2001', 'carlos@email.com'),
(2, 'Ana Oliveira', 'CPF-FICTICIO-004', '(15) 99999-2002', 'ana@email.com'),
(3, 'Fernanda Souza', 'CPF-FICTICIO-005', '(15) 99999-2003', 'fernanda@email.com');
select * from responsavel;


INSERT INTO Paciente
(id_paci, id_res, nome, cpf, data_nascimento, tipo_atendimento) VALUES
(1, 1, 'Pedro Mendes', 'CPF-FICTICIO-006', '2015-03-12', 'TEA'),
(2, 1, 'Julia Mendes', 'CPF-FICTICIO-007', '2017-08-20', 'TEA'),
(3, 2, 'Gabriel Oliveira', 'CPF-FICTICIO-008', '2012-05-15', 'ONCOLOGIA'),
(4, 3, 'Laura Souza', 'CPF-FICTICIO-009', '2016-11-02', 'TEA');
select * from terapeuta;

INSERT INTO Terapeuta
(id_te, id_uni, nome, cpf, telefone, email) VALUES
(default, 1, 'Roberto Lima', 'CPF-FICTICIO-010', '(15) 99999-3001', 'roberto@email.com'),
(default, 1, 'Camila Rocha', 'CPF-FICTICIO-011', '(15) 99999-3002', 'camila@email.com'),
(default, 2, 'Bruno Santos', 'CPF-FICTICIO-012', '(15) 99999-3003', 'bruno@email.com');
select * from terapeuta;


select * from terapeuta;

INSERT INTO Disponibilidade
(id_disponibilidade, dia_semana, hora_inicio, hora_fim, id_te) VALUES
(1, 'Segunda-feira', '08:00:00', '12:00:00', 1),
(2, 'Quarta-feira', '13:00:00', '17:00:00', 1),
(3, 'Terça-feira', '08:00:00', '12:00:00', 2),
(4, 'Quinta-feira', '13:00:00', '18:00:00', 2),
(5, 'Sexta-feira', '08:00:00', '12:00:00', 3);
select * from disponibilidade;

INSERT INTO Especialidade
(id_especi, nome) VALUES
(1, 'Psicologia'),
(2, 'Fonoaudiologia'),
(3, 'Terapia Ocupacional');
select * from especialidade;

INSERT INTO Sala
(id_sal, id_uni, numero_sal) VALUES
(default, 1, 101),
(default, 1, 102),
(default, 2, 101),
(default, 2, 102);
select * from sala;

INSERT INTO Terapeuta_Especialidade
(id_te, id_especi) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1);
select * from terapeuta_especialidade;

INSERT INTO Agendamento
(id_agen, hora_inicio, hora_fim, data_agendamento, stats,
 id_rece, id_te, id_paci, id_res, id_especi, id_sal, id_uni)
VALUES

(DEFAULT, '08:00:00', '09:00:00', '2026-11-16', 'AGENDADO',
 1, 1, 1, 1, 1, 1, 1),

(DEFAULT, '09:00:00', '10:00:00', '2026-11-16', 'AGENDADO',
 1, 1, 2, 1, 2, 2, 1),

(DEFAULT, '13:00:00', '14:00:00', '2026-11-17', 'AGENDADO',
 2, 2, 4, 3, 3, 3, 2),

(DEFAULT, '14:00:00', '15:00:00', '2026-11-17', 'REALIZADO',
 2, 3, 3, 2, 1, 4, 2),

(DEFAULT, '08:00:00', '09:00:00', '2026-11-20', 'CANCELADO',
 1, 1, 1, 1, 1, 1, 1);
 select * from Agendamento;
 
 DESCRIBE Agendamento;
