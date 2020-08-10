const app = require('express')()    // Faz duas chamas consecutivas. O resultado da chamada do "express", será armazenado em  "app"
const consign = require('consign')  // O consign "injeta" o "app" nos middlewares, tornando mais fácil administrar as dependencias
const db = require('./config/db')   // Comunicação/configuração com o Banco de Dados

app.db = db                         // "Injeta" as funcionalidades do "db" no comando app.db

consign()
    .then('./config/middlewares.js')    // Chama os midllewares (Trabalha com o JSON)
    .then('./api')                      // Lê todos os arquivos dentro da pasta (no caso, conversa com o BD)
    .then('./config/routes.js')         // Vai ler as rotas após carregar todas as configurações (linhas anteriores)
    .into(app)  // Injeta o "app" como parametro em cada uma das dependencias dos arquivos informados

app.listen(4000, () => {
    console.log('Backend executando ...')
})