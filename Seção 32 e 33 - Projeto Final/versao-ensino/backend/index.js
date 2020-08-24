const app = require('express')()    // Faz duas chamas consecutivas. O resultado da chamada do "express", será armazenado em  "app"
const consign = require('consign')  // O consign "injeta" o "app" nos middlewares, tornando mais fácil administrar as dependencias
const mongoose = require('mongoose')

const db = require('./config/db.js')   // Comunicação/configuração com o Banco de Dados
app.db = db                         // "Injeta" as funcionalidades do "db" no comando app.db

require('./config/mongodb')
app.mongoose = mongoose

consign()
    .include('./config/passport.js')    // Autenticação
    .then('./config/middlewares.js')    // Chama os midllewares (Trabalha com o JSON)
    .then('./api/validation.js')        // Métodos de validação dos dados que serão cadastrados
    .then('./api')                      // Lê todos os arquivos dentro da pasta (no caso, conversa com o BD)
    .then('./config/routes.js')         // Vai ler as rotas após carregar todas as configurações (linhas anteriores)
    .into(app)  // Injeta o "app" como parametro em cada uma das dependencias dos arquivos informados

app.listen(4000, () => {
    console.log('Backend executando ...')
})