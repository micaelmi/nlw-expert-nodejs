# Como criar a API

Terminal

1. `npm init -y`
2. `npm i typescript @types/node -D`
3. `npx tsc --init`

tsconfig.json

1. "target": "es2022",
2. "lib": ["ES2023"],
3. "module": "node16",

- Fastify

  - `npm i fastify`

- Criar pasta src
- Criar http/server.ts
- Definir o app, importando o fastify

- Docker

  - https://docs.docker.com/desktop/install/windows-install/
  - Criar arquivo docker-compose.yml
  - terminal
    - `docker compose up -d` ==> roda os volumes do docker
    - `docker compose down` ==> para os volumes do docker
    - `docker ps` ==> monitorar containers rodando

- Utilização do banco

  - Instalação do ORM Prisma
    1 - `npm i -D prisma`
    2 - `npx prisma init`
    3 - alterar valores para conexão no .env
    (utilizar dados definidos no docker-compose)

- Cliente HTTP para testar a API

  - hoppscotch.io
  - baixar a extensão do chrome
  - fazer requisições

- Utilização do Prisma

  - schema.prisma: definição do banco
  - instancia o prisma

  ```js
  import { PrismaClient } from "@prisma/client";
  export const prisma = new PrismaClient();
  ```

- Utilização do Redis (redis.io)

  - `npm i ioredis`
  - serve para criar um count de dados

  ```js
  import { Redis } from "ioredis";
  export const redis = new Redis();
  ```

  - também possui um sistema automático de ranking:
    - ZINCRBY key increment member: incrementa um valor em determinado item
    - ZRANGE key start stop: busca os resultados de acordo com os parâmetros

- Utilização de WebSockets
  - `npm i @fastify/websocket `
  - abre uma conexão com o cliente e mantém
  ```js
  app.get("...", { websocket: true }, (connection, request) => {});
  ```
