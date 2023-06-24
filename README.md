# Safe-Alert-back-end

Back-end Safe Alert

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Back-end desenvolvido em Typescript utilizando o framework NestJs para criação de um Sistema para Defesa Civil.

## Requisitos

- Typescript
- NodeJS
- Docker
- Npm ou Yarn
- docker-compose

## Dependencias

Ao clonar o projeto instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

## Variáveis de ambiente

Para a devida execução do projeto é necessário configurar um arquivo de variáveis de ambiente. Na raiz do projeto existe um arquivo chamado .env.exemple que servirá de base para configuração.

Duplique este arquivo `.env.example` e altere o nome para `.env`, neste arquivo deverão ser definidas as variáveis de ambiente. Em caso de dúdivas, as instruções para correta configuração das variaveis estão dispostas no arquivo.

## Banco de dados

Para executar o banco utilizando docker execute o seguinte comando:

```bash
docker-compose up -d
```

## Execução das Migrations

Para criar o schema execute o comando abaixo, ele irá executar as migrations referentes ao schema atual:

```bash
npx prisma migrate dev 
```

Caso realize alterações no schema.prisma, é necessário realizar uma nova migration, para isso execute o comando abaixo:

```bash
npx prisma migrate dev --name nome_da_migration
```

## Execução de seed de dados

Para popular o banco de dados com os dados iniciais execute o comando abaixo:

```bash
npx prisma db seed 
```

## Execução da aplicação

Use os seguintes comandos para executar a aplicação

```bash
# development
$ npm run start ou
$ yarn start

# watch mode
$ npm run start:dev ou
$ yarn start:dev

# production mode
$ npm run start:prod ou
$ yarn start:prod
```

## Rotas da aplicação

As rotas estão documentadas utilizando o Swagger, para visualizar a documentação acesse o endereço `<http://localhost:port/api>`.
Onde está o port substitua pela porta configurada no arquivo `.env`, onde a aplicação está sendo executada.

Além das rotas documentadas pelo Swagger, a aplicação possui a collection gerada no Insomnia, disponível na pasta doc, na raiz do projeto.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
