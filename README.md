# AtivoWatch DB

Sistema de modelagem de dados e monitoramento de ativos industriais, focado em telemetria de alta frequência e análise de séries temporais.

## 🎯 Objetivo
Este projeto foi desenvolvido para consolidar conhecimentos em bancos de dados relacionais e de séries temporais, simulando o back-end de um mini-SCADA. Ele recebe leituras de sensores (temperatura, vibração, irradiância), armazena em uma hypertable e as disponibiliza via API REST e SSE (Server-Sent Events).

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Back-end | Node.js, Express, pg (driver nativo) |
| Tempo Real | SSE (Server-Sent Events) com LISTEN/NOTIFY |
| Banco de Dados | PostgreSQL 16 + TimescaleDB (série temporal) |
| Infraestrutura | Docker / Docker Compose |
| Testes | Vitest + Supertest |
| Qualidade de Código | ESLint |
| CI/CD | GitHub Actions |


## 📐 Modelo de Dados
O banco segue a seguinte estrutura relacional:
- `assets` (Ativos industriais, ex: Turbina)
- `sensors` (Sensores vinculados a um ativo, ex: Temperatura)
- `readings` (Leituras de telemetria. Esta tabela é uma **hypertable** do TimescaleDB para otimização de consultas temporais).

## 🚀 Como rodar o projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Docker](https://www.docker.com/) e Docker Compose
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)

### 1. Clonar o repositório
```bash
git clone https://github.com/VitorTFraga/AtivoWatchDB.git
cd AtivoWatchDB
```
### 2. Subir o Banco de Dados
O banco (PostgreSQL + TimescaleDB) roda em um container Docker. O script de inicialização criará as tabelas e inserirá dados de teste automaticamente.
```bash
docker compose up -d
```
### 3. Iniciar a API (Back-end)
Em outro terminal, acesse a pasta do servidor, instale as dependências e inicie a aplicação:
```bash
cd server
npm install
npm run dev
```
A API estará disponível no endereço `http://localhost:3001`.
### 4. Testar o sistema em tempo real
Com a API rodando, o simulador começará a gerar novas leituras a cada 1 segundo. Você pode testar o fluxo em tempo real (SSE) usando o `curl` no seu terminal:
```bash
curl -N http://localhost:3001/api/stream
```
Você verá os pacotes JSON contendo as novas leituras chegando em tempo real.

### 5. Rodar os testes automatizados (Opcional)
Para garantir que tudo está funcionando corretamente, rode a suíte de testes (o banco precisa estar rodando):
```bash
cd server
npm test
```


## 🔌 Endpoints da API
- `GET /health` - Status da API.
- `GET /api/ativos` - Lista os ativos e a contagem de sensores (Demonstra `JOIN` e `GROUP BY`).
- `GET /api/leituras/:sensorId?minutos=60` - Retorna a média, mínimo e máximo das leituras agrupadas por minuto (Demonstra `time_bucket` do TimescaleDB).
- `GET /api/stream` - Conexão SSE para receber as leituras em tempo real.


## 📊 Exemplos de Queries SQL
O arquivo db/queries.sql contém exemplos que demonstram o poder da modelagem, incluindo:

- JOIN de ativos com sensores
- Agregações (`AVG`, `MIN`, `MAX`)
- Filtros de período (`now() - interval '1 hour'`)
- Agrupamento por janela temporal (`time_bucket`)

## 📧 Contato

Se você tem sugestões, dicas, ou feedback sobre o projeto, você pode me achar aqui:

* **GitHub:** [VitorTFraga](https://github.com/VitorTFraga) 
* **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/vitor-táboas-fraga-002651212/)
