# Simple Rest APIs with NodeJS, Express and MongoDB

Repositório para colocar em prática tudo que venho apredendo nos meus estudos de NodeJS!

## Instruções para montar o projeto:

*  Instalar [Node.JS](https://www.nodejs.org/en/download/)

* Instalar os pacotes necessario do projeto dentro **Repositório**
    ```bash
    npm install
    ```
* Rodar o projeto
    * Executar:
    ```bash
    node app.js
    ```
### Endpoints: ###
* Usuarios
```bash
GET - Retornar os dados do usuário autenticado
/users
```
```bash
POST - Cadastrar um usuário
/users/create

{
    "email": "email@email.com", 
    "password": "1234"
}
```
```bash
POST - Autenticar usuário
/users/auth

{
    "email": "email@email.com", 
    "password": "1234"
}
```
 
