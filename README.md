# API_Games
 API utilizada para estudo

##Endpoints
### GET /games
Responsável por retornar a listagem de todos o games cadastrados no banco de dados.
#### Parâmetros
Nenhum.
#### Respostas
##### OK! 200
Listagem correta de todos os games.
Exemplo de resposta:
```
[
    {
      "id": 1,
      "title": "Call of duty",
      "year": 2000,
      "price": 100
    },
    {
      "id": 2,
      "title": "Crossfire",
      "year": 2001,
      "price": 0
    },
    {
      "id": 3,
      "title": "Minecraft",
      "year": 2012,
      "price": 150
    },
    {
      "id": 4,
      "title": "pubg",
      "year": 2016,
      "price": 70
    }
  ]
```
##### Falha na autenticação! 401
Falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado
Exemplo de resposta:
```
{
  "err": "Token invalido"
}
```

### POST /auth
Responsável por fazer o processo de login.
#### Parâmetros
email: e-mail do usuário cadastrado no sistema.
password: senha do usuário cadastrado no sistema.
```
{
	"email":"programadorteste@gmail.com",
	"password":"cafe"
}
```
#### Respostas
##### OK! 200
Recebimebnto do token JWT para acesso.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJwcm9ncmFtYWRvcnRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTYyOTQ3Njc3MiwiZXhwIjoxNjI5NTYzMTcyfQ.LkFreoPZYfv46cg3cE69YFEtZf0suUIBLq2CnIrdK-c"
}
```
##### Falha na autenticação! 401
Falha durante o processo de autenticação da requisição. Motivos: email inválido, senha expirada
Exemplo de resposta:
```
{
  "err": "Credenciais inválidas"
}
```
