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

