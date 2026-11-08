# HelpHope

**Protótipo de aplicativo desktop para gerenciamento de agendamentos da ASIPECA.**

---

## 📌 Sobre o Projeto

O **HelpHope** é uma solução proposta para auxiliar a **ASIPECA**, instituição localizada em Sorocaba (SP), na organização e no gerenciamento de agendamentos de atendimentos.

O projeto tem como foco facilitar o controle de horários, a organização das agendas, o cadastro de pacientes e responsáveis e a distribuição dos atendimentos entre salas e profissionais.

Nesta etapa, o HelpHope é composto por um **protótipo de interfaces desenvolvido no Figma** e pela **modelagem de um banco de dados relacional**, que servem como base para uma futura implementação do aplicativo desktop.

**Importante:** o HelpHope ainda não é um aplicativo desktop implementado e implantado. As interfaces e interações apresentadas pertencem ao protótipo.

---

## 🎯 Objetivo

Propor uma solução para melhorar a organização dos agendamentos da ASIPECA, facilitando o trabalho da recepção e o gerenciamento das informações necessárias aos atendimentos.

O projeto busca contribuir para:

- Organização de datas e horários.
- Redução de conflitos de agendamento.
- Centralização das informações de pacientes e responsáveis.
- Organização dos atendimentos por salas e profissionais.
- Consulta e acompanhamento da agenda.

Esses benefícios representam objetivos da solução e ainda não constituem resultados comprovados de implantação.

---

## ✨ Funcionalidades Representadas no Protótipo

### 📅 Agenda e calendário

Visualização dos atendimentos organizados por datas, horários e disponibilidade.

### 👥 Cadastro de pacientes e responsáveis

Interfaces para registro e consulta das informações necessárias à organização dos atendimentos.

### 🏥 Organização de salas e profissionais

Representação da distribuição dos agendamentos conforme salas, profissionais e horários disponíveis.

### 📋 Gerenciamento de agendamentos

Interfaces para criação, consulta, alteração e cancelamento de agendamentos.

### 🔎 Consulta de informações

Visualização e busca de informações relacionadas aos pacientes e seus agendamentos.

**Observação:** essas funcionalidades estão representadas no protótipo e não devem ser interpretadas como módulos de um sistema desktop já implementado.

---

## 💻 Tecnologias e Ferramentas

### 🎨 Prototipação e interfaces

- **Figma / Figma Make:** criação e organização das interfaces e interações do protótipo.
- **Código exportado do Figma:** arquivos utilizados para representar e executar a interface prototipada, conforme o conteúdo exportado.

### 🗄️ Banco de Dados

- **MySQL:** tecnologia de referência para a modelagem e os scripts SQL do banco de dados.
- **SQL:** definição de tabelas, atributos, chaves e relacionamentos.

Os scripts do banco de dados representam a estrutura proposta. Sua existência não significa que o banco já esteja integrado ao protótipo.

### 🛠️ Organização e desenvolvimento

- GitHub — versionamento e armazenamento dos arquivos.
- Trello — organização das atividades.
- Figma — prototipação.
- MySQL — criaçâo do arquivo SQL.

As bibliotecas e linguagens específicas do código exportado do Figma deverão ser identificadas conforme os arquivos efetivamente adicionados ao repositório.

---

## 📂 Organização do Repositório

Estrutura recomendada:

```text
HelpHope/
│
├── codigo/
│   ├── figma/
│   │   └── arquivos do protótipo exportado
│   │
│   └── banco-de-dados/
│       └── scripts SQL
│
├── prompts/
│   └── prompts utilizados no projeto
│
├── docs/
│   └── documentação e materiais do projeto
│
├── assets/
│   └── prints/
│       └── capturas das interfaces
│
└── README.md
```

A estrutura apresentada é a organização recomendada para os arquivos desta etapa. Algumas pastas poderão precisar ser criadas ou reorganizadas no repositório.

---

## 🖥️ Estrutura do Projeto

O repositório reúne os materiais de desenvolvimento do HelpHope:

**1. Protótipo de interfaces**

Arquivos relacionados às telas e interações desenvolvidas no Figma, representando o fluxo de gerenciamento de agendamentos.

**2. Modelagem do banco de dados**

Scripts SQL e materiais de modelagem utilizados para estruturar as informações necessárias ao gerenciamento dos atendimentos.

**3. Documentação**

Materiais de requisitos, diagramas, apresentações e registros de desenvolvimento.

**4. Recursos visuais**

Capturas das interfaces, imagens e outros materiais utilizados na apresentação do projeto.

**5. Prompts**

Instruções utilizadas como apoio à elaboração e ao aperfeiçoamento do protótipo.

---

## 🎨 Protótipo no Figma

O Figma foi utilizado para representar visualmente o funcionamento proposto do HelpHope.

O protótipo contempla interfaces relacionadas a:

- Visualização da agenda.
- Cadastro de pacientes e responsáveis.
- Organização de salas e profissionais.
- Criação e gerenciamento de agendamentos.
- Navegação entre as telas representadas.

As interações do protótipo permitem demonstrar fluxos de utilização, mas não substituem a implementação de um aplicativo desktop com banco de dados integrado.

---

## 🗄️ Banco de Dados

A modelagem do banco de dados foi desenvolvida para representar as informações necessárias ao gerenciamento de agendamentos da ASIPECA.

Os materiais podem incluir:

- Modelo Entidade-Relacionamento (MER): representação das entidades, seus atributos e relacionamentos.
- Diagrama Entidade-Relacionamento (DER): representação visual da estrutura e dos relacionamentos entre as tabelas.
- DDL (Data Definition Language): scripts SQL para criação e definição da estrutura das tabelas.
- DML (Data Manipulation Language): scripts SQL para inserção de dados fictícios utilizados em testes e demonstrações.
- Chaves primárias e estrangeiras (PK e FK): identificação dos registros e estabelecimento de relacionamentos entre tabelas.
- Integridade referencial: restrições que ajudam a manter a consistência dos relacionamentos entre os dados.

Os arquivos SQL serão disponibilizados na pasta:

`codigo/banco-de-dados/`

**O banco de dados ainda não está integrado a um aplicativo desktop funcional.**

---

## 🤖 Apoio de Inteligência Artificial

Ferramentas de inteligência artificial foram utilizadas como apoio à organização do projeto, à criação e revisão de interfaces, à documentação e à elaboração de instruções para prototipação.

Entre as ferramentas utilizadas estão:

- Figma Make.
- ChatGPT.

Os prompts e materiais correspondentes poderão ser consultados na pasta:

`prompts/`

---

## 📸 Imagens do Projeto

As capturas das interfaces e os recursos visuais do HelpHope estão organizados na pasta:

`assets/prints/`

Essas imagens apresentam o design e os fluxos representados no protótipo.

---

## 📚 Documentação

A documentação do projeto está organizada na pasta:

`docs/`

Ela reúne materiais relacionados ao levantamento de requisitos, modelagem, planejamento, apresentações e evolução da proposta.

---

## 👥 Equipe de Desenvolvimento

- **Pedro Gustavo Fernandes Bendinelli**
- **Eduardo Henrique Silveira Ferreira**
- **João Pedro Pereti do Nascimento Leite**
- **Eduardo Lima de Almeida**

---

## 🚀 Status do Projeto

| Componente | Situação |
|---|---|
| Levantamento de requisitos | Realizado |
| Prototipação de interfaces no Figma | Desenvolvida |
| Modelagem do banco de dados | Desenvolvida |
| Scripts SQL | Preparados para inclusão no repositório |
| Código exportado do Figma | Preparado para inclusão no repositório |
| Landing Page | Desenvolvida |
| Aplicativo desktop funcional | Não implementado nesta etapa |
| Integração entre interfaces e banco de dados | Não implementada nesta etapa |

**Status geral: prototipação e modelagem de dados.**

---

## 🔗 Links do Projeto

**Landing Page / Figma**

https://cell-sphere-59682608.figma.site

**Trello**

https://trello.com/b/AnpXjfxY/usina-de-projetos

**Protótipo anterior / Claude**

https://claude.ai/public/artifacts/a73865b7-5ab8-4f4f-84dd-9d85224c22ba

*O link do Claude é mantido como referência de uma versão anterior e não representa necessariamente a versão atual do HelpHope.*

---

## 🏫 Instituição de Ensino

**Centro Universitário Facens**

Curso: Análise e Desenvolvimento de Sistemas (ADS)

Projeto desenvolvido no contexto da UPX — Usina de Projetos Experimentais.

**Instituição beneficiada:** ASIPECA — Sorocaba, São Paulo.

---

## 🌎 English Version

### About HelpHope

HelpHope is a proposed desktop appointment scheduling application designed to support ASIPECA, a nonprofit organization based in Sorocaba, Brazil.

The project focuses on organizing appointments, managing schedules, registering patients and their guardians, and coordinating rooms and professionals.

### Current Development Stage

The current deliverables consist of:

- Interactive interface prototypes created with Figma.
- Relational database modeling.
- SQL database scripts.
- Exported Figma prototype code.
- Project documentation and interface screenshots.

**HelpHope is not yet a fully implemented or deployed desktop application.**

The prototype and database design provide a foundation for future software development.

### Tools

- Figma / Figma Make
- MySQL / SQL
- GitHub
- Trello
- ChatGPT
- Claude AI

---

© 2026 HelpHope. Todos os direitos reservados.
