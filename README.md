# Advantage Online Shopping - Playwright E2E Tests

Este projeto contém testes automatizados end-to-end para o site [Advantage Online Shopping](https://www.advantageonlineshopping.com), utilizando o framework [Playwright](https://playwright.dev/).

## Estrutura do Projeto

- `tests`: Testes automatizados organizados por funcionalidades.
- `tests/fixtures`: Dados e tipos utilizados nos testes.
- `tests/support/pages`: Page Objects para facilitar a manutenção dos testes.
- `playwright.config.ts`: Configuração do Playwright.
- `playwright-report`: Relatórios gerados após a execução dos testes.

## Requisitos

- [Node.js](https://nodejs.org/) versão 22 ou superior
- [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   cd advantageonlineshopping-playwright-fcxlabs
   ```

2. Instale as dependências:
   ```sh
   npm ci
   ```

3. Instale os navegadores do Playwright:
   ```sh
   npx playwright install --with-deps
   ```

## Como executar os testes

Para rodar o teste do desafio:
```sh
npm run test:technicalchallenge
```
