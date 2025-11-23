# CineTracker

Aplicação front-end simples para acompanhar filmes assistidos, conquistas e estatísticas. Projeto de estudo construído com Vue 3, Pinia e Vite. Inclui uma API fake baseada em `json-server` para dados locais.

**Status:** Em desenvolvimento

## Tecnologias

- **Framework:** Vue 3
- **Estado:** Pinia
- **Roteamento:** Vue Router
- **Build / Dev:** Vite
- **Testes:** Vitest
- **API fake:** json-server

## Estrutura do projeto (resumida)

- `src/`: código fonte da aplicação
- `src/components/`: componentes Vue reutilizáveis
- `src/views/`: páginas/rotas da aplicação
- `src/api/db.json`: banco de dados JSON usado pelo `json-server`
- `src/stores/`: stores do Pinia

## Requisitos

- Node.js (versão compatível com a chave `engines` no `package.json`).
- npm ou yarn.

Recomenda-se usar Node 20 ou superior.

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd cinetracker
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

## Scripts disponíveis

Os scripts definidos em `package.json` e seu propósito:

- `dev`: inicia o servidor de desenvolvimento do Vite.
- `build`: gera os arquivos de produção (build) com Vite.
- `preview`: executa um servidor para pré-visualizar o build gerado.
- `test:unit`: executa os testes unitários com Vitest.
- `lint`: executa o ESLint e tenta corrigir problemas automaticamente.
- `format`: formata o código na pasta `src/` com Prettier.
- `api:start`: inicia um servidor `json-server` em `http://localhost:3001` usando `src/api/db.json`.

### Como executar a aplicação localmente

1. Iniciar a API fake (opcional, mas recomendada para testar dados locais):

```bash
npm run api:start
# ou
yarn api:start
```

2. Em outra aba/terminal, iniciar a aplicação em modo desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Após isso, abra `http://localhost:5173` (porta padrão do Vite) no navegador.
