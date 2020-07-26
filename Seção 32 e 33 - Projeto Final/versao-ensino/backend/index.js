const app = require('express')()    // Faz duas chamas consecutivas. O resultado da chamada do "express", será armazenado em  "app"
const consign = require('consign')  // O consign "injeta" o "app" nos middlewares, tornando mais fácil administrar as dependencias

consign()
    .then('./config/middlewares.js')
    .into(app)  // Injeta o "app" como parametro em cada uma das dependencias que ele carregar

app.listen(3000, () => {
    console.log('Backend executando ...')
})