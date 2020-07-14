const express = require('express')
const app = express()

// Ele para na primeira "chamada" q for aceito
// Se a primeira for a mais genérica (igual a abaixo), nunca acesssará as demais
/*app.use((req, res) => {     //Toda vez que qualquer subdominio é acessado, ele vai ser chamado. Independentemente do método/requisição utilizado
    res.send('Acessou!!!')
})*/

app.use('/hwe', (req, res) => {     // Subdominio especifico
    res.send('Página hwe 🤖')
})

app.get('/get', (req, res) => {             // Requisição do tipo get
    res.send('get 👉')
})


app.listen(3000, () => {
    console.log('Backend executando ...')
})