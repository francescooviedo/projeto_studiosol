
# Projeto Senha válida 

Desafio de habilidade para testar conhecimento e backend. 

## Sobre

O desafio do projeto é criar uma verificação de senhas a partir
de um conjunto de regras.

Foi construida uma `API REST` com um enpoint `POST /verify`.

A API está preparada para receber uma requisição HTTP com seu
corpo em formato `JSON`.

Quando a API recebe uma requisição , a mesma irá conter uma senha e um 
conjunto de regras para a validação da senha.

De acordo com essa validação ela responde se a senha segue as regras, com um boleano
no campo `verify` e quais regras não foram seguidas no campo `noMatch`.

### Stack utilizada


<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://mochajs.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="mocha" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>


## Inicialização do projeto via Docker

Garanta que o docker esteja instalado na sua máquina.

Rode os seguintes comandos para clonar o projeto, entrar em sua pasta, construir a imagem e subir um container a partir desta imagem: 

```sh
 git clone git@github.com:francescooviedo/projeto_studiosol.git

 cd projeto_studiosol

 docker build -t projeto_studiosol .    

 docker run -p 8080:8080 -d --name studiosol projeto_studiosol     
```

## Inicialização local

Rode os seguintes comandos para clonar o projeto, entrar em sua pasta, instalar as dependências e inicializar a aplicação: 

```sh
 git clone git@github.com:francescooviedo/projeto_studiosol.git

 cd projeto_studiosol

 npm install

 npm start # ou `npm run dev` 
```
## Rodando os testes

Para rodar os testes dentro do container, rode o seguinte comando

```bash
docker exec -it studiosol npm test    
```

## Rodando os testes localmente

Garanta que as dependências do projeto estejam instaladas e rode o seguinte comando:

```bash
npm test
```
## Como funciona:

A API recebe uma requisição com o corpo no formato `JSON` no seguinte conteúdo:
```json
{
    "password": "TesteSenhaForte!123&",
    "rules": [
        { "rule": "minSize", "value": 8 },
        { "rule": "minSpecialChars", "value": 2},
        { "rule": "noRepeted", "value": 0 },
        { "rule": "minDigit", "value": 4 }
    ]
}
```
Quando a requisição é recebida ela é passada como parâmetro na função `passwordController`.
Na função, o corpo é usado como parâmetro para uma segunda função dentro do `try` chamada
`passwordVerifyService`	quando, não se rebece um Array de regras na chave `rules` ela responde a requisição da seguinte forma:
```json
{
    "verify": true,
    "noMatch": []
}
```

Caso um Array de regras exista a função vai chamar pra cada elemento contido no Array 
de regras, uma função que valida se a regra está sendo seguida pela senha.
As funções de validação são contidas dentro do objeto [`passwordDictionaryRules`](#src/services/passwordService.js).

Caso a senha não siga as regras passadas no corpo a resposta mostrará quais regras não foram
seguidas detro da chave `noMatch` retornando um `JSON` similar a:

```json
{
    "verify": false,
    "noMatch": ["minDigit"]
}
```

Se alguma das regras na chave `rules` no corpo da requisição não existir no dicionário [`passwordDictionaryRules`](#src/services/passwordService.js)
a resposta da requisição terá status 400 e será: 

```json
{ "message": "please insert the correct rules" }
```

## Os Testes

Os testes estão divididos em testes unitários e testes de integração.

Os testes unitários avaliam o comportamento das funções contidas no dicionário `passwordDictionaryRules` e a função [`passwordVerifyService `](#src/services/passwordService.js) validando se o corpo da requisição está sem regras e com regras.

Os testes de integração avaliam a resposta de uma requisição válida e de uma inválida, garantido que o 
status da requisição e seu corpo estejam corretos.

