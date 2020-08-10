const app = require('express')()    // Faz duas chamas consecutivas. O resultado da chamada do "express", será armazenado em  "app"
const consign = require('consign')  // O consign "injeta" o "app" nos middlewares, tornando mais fácil administrar as dependencias

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)  // Injeta o "app" como parametro em cada uma das dependencias dos arquivos informados

app.listen(4000, () => {
    console.log('Backend executando ...')
})