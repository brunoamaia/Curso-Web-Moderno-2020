const express = require('express')
const app = express()

// Ele para na primeira "chamada" q for aceito
// Se a primeira for a mais genérica (igual a abaixo), nunca acesssará as demais
/*app.use((req, res) => {     //Toda vez que qualquer subdominio é acessado, ele vai ser chamado. Independentemente do método/requisição utilizado
    res.send('Acessou!!!')
})*/

app.use('/hwe', (req, res) => {     // Subdominio especifico
    res.json([
        {id: 7, name: 'Ana', position: 1},
        {id: 34, name: 'Bia', position: 2},
        {id: 73, name: 'Carlos', position: 3}
    ])
    /*res.json({
        name: 'Tablet 32Gb',
        price: 1899.00,
        discount: 0.12
    })*/
    res.send('Página hwe 🤖')
})

app.get('/get', (req, res) => {             // Requisição do tipo get
    res.send('get 👉')
})


app.listen(3000, () => {
    console.log('Backend executando ...')
})