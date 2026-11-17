# AtivoWatch DB

Sistema de modelagem de dados e monitoramento de ativos industriais, focado em telemetria de alta frequência e análise de séries temporais.

## 🎯 Objetivo
Este projeto foi desenvolvido para consolidar conhecimentos em bancos de dados relacionais e de séries temporais, simulando o back-end de um mini-SCADA. Ele recebe leituras de sensores (temperatura, vibração, irradiância), armazena em uma hypertable e as disponibiliza via API REST e SSE (Server-Sent Events).

## 🛠 Tecnologias Utilizadas
- **Banco de Dados:** PostgreSQL 16 + TimescaleDB (série temporal)
- **Back-end:** Node.js, Express, driver `pg` nativo (sem ORM)
- **Tempo Real:** SSE (Server-Sent Events) com `LISTEN/NOTIFY` do PostgreSQL
- **Testes:** Vitest e Supertest
- **Infraestrutura:** Docker / Docker Compose e GitHub Actions (CI)

## 📐 Modelo de Dados
O banco segue a seguinte estrutura relacional:
- `assets` (Ativos industriais, ex: Turbina)
- `sensors` (Sensores vinculados a um ativo, ex: Temperatura)
- `readings` (Leituras de telemetria. Esta tabela é uma **hypertable** do TimescaleDB para otimização de consultas temporais).

## 🚀 Como rodar o projeto

### 1. Subir o Banco de Dados
```bash
docker compose up -d