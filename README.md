# Project Trybe Futebol Clube

Este repositório contém o projeto Trybe Futebol Clube desenvolvido por [Camila Wolter](https://www.linkedin.com/in/camilawolter/) enquanto estudava na [Trybe](https://www.betrybe.com/) no módulo de BackEnd.

## Descrição 

Este projeto é um site informativo sobre partidas e classificações de futebol, onde se desenvolveu uma API (utilizando o método TDD) e também integrou através do docker-compose as aplicações para que elas funcionem consumindo um banco de dados. Esta é uma aplicação Full Stack, sendo que o front-end foi desenvolvido pela [Trybe](https://www.betrybe.com/)
![Exemplo app front](/front-example.png)

Tecnologias utilizadas:

**Full-stack:** [Docker](https://www.docker.com/)

**Front-end:** [React](https://reactjs.org/), [axios](https://axios-http.com/)

**Back-end:** [Typescript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/), [Sinon.JS](https://sinonjs.org/), [Chai](https://www.chaijs.com/), [JWT](https://jwt.io/), [bcrypt](https://www.npmjs.com/package/bcrypt)

**Database:** [MySQL](https://www.mysql.com/)

## Instalação

<details>
<summary>Instalação Localmente</summary>
Clone o projeto

```bash
  git clone git@github.com:camilawolter/projeto-trybe-futebol-clube.git
```

Entre no diretório do projeto

```bash
  cd project-trybe-soccer-club
```

Rodar os containers e instalar as suas depencências (necessário [docker-compose](https://docs.docker.com/compose/install/))

```bash
  npm run compose:up
```

The frontend is configured for port: [3000](http://localhost:3000/leaderboard)

Parar os containers

```bash
  npm run compose:down
```
</details>

<details>
<summary>Rodando os Testes</summary>
Acesse o container do backend com o seguinte comando

```bash
  docker exec -it app_backend sh
```

Rodando os testes

```bash
    npm test
```
</details>

## Documentação da API

<details>
<summary>Users e Login</summary>

### Retornar o token do login

```http
   POST /login
```

Request body

```json
{
  "email": "admin@admin.com", 
  "password": "secret_admin",
}
```

Response body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" 
}
```

### Retornar o role

```http
  GET /login/validate
```

No header é passado o token de validação para receber corretamente o response body

```json
{ "role": "admin" }
```
</details>

<details>
<summary>Teams</summary>

### Retornar todos os times

```http
  GET /teams
```

Response body

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  ...
]
```

### Retornar um time

```http
  GET /teams/${id}
```

Response body

```json
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
```
</details>

<details>
<summary>Matches</summary>

### Retornar todas as partidas incluindo o nome do time

```http
  GET /matches
```

Nesta rota pode-se usar query string como parâmetro

Response body

```json
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
]
```

### Criando uma nova partida

```http
  POST /matches
```

Request body

```json
{
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}
```

Response body

```json
{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

### Atualizar uma partida em progresso

```http
  PATCH /matches/${id}
```

Request boby

```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

Response body

```json
{ "message": "Updated" }
```

### Finalizar uma partida

```http
  PATCH /matches/${id}/finished
```

Response body

```json
{ "message": "Finished" }
```
</details>

<details>
<summary>Leaderboards</summary>

### Team ranking

```http
  GET /leaderboard
```

Response body

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  ...
]
```

### Ranking de times com jogos em casa

```http
  GET /leaderboard/home
```

Response body

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  ...
]
```

### Ranking das times com jogos fora de casa

```http
  GET /leaderboard/away
```

Response body

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  ...
]
```
</details>
