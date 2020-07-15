const express = require('express')  // quando está na pasta "node_modules", não é necessário colocar o endereço
const app = express()

const saudacao = require('./saudacaoMid')   // Como foi exportado dentro do index, pode importar pelo "require"

app.use(saudacao('Jão'))    // Usando/chamando uma função Midlleware

// Pode ter apenas uma saida (resposta) em cada "chamada"

// Ele para na primeira "chamada" q for aceito
// Se a primeira for a mais genérica (igual a abaixo), nunca acesssará as demais
app.use((req, res, next) => {     //Toda vez que qualquer subdominio é acessado, ele vai ser chamado. Independentemente do método/requisição utilizado
    //res.send('Acessou!!!')
    console.log('Entrou no domínio');
    next()
})

// Quando se tem mais que uma chamada para o mesmo endereço
// Poedemos utilizar o "next()", que fará com que chame a próxima instrução 
app.use('/hwe', (req, res, next) => {
    console.log('Acessou a primeira parte!!')
    next()
})

app.use('/hwe', (req, res) => {     // Subdominio especifico
    // Enviar mais dados
    res.json({
        data:[
            {id: 7, name: 'Ana', position: 1},
            { id: 34, name: 'Bia', position: 2 },
            { id: 73, name: 'Carlos', position: 3}
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200
    })
    console.log('Módulo principal...')

    /*  // Enviar array de objetos e jsom
    res.json([
        {id: 7, name: 'Ana', position: 1},
        {id: 34, name: 'Bia', position: 2},
        {id: 73, name: 'Carlos', position: 3}
    ])*/

    /* //   Enviar Objeto
    res.json({
        name: 'Tablet 32Gb',
        price: 1899.00,
        discount: 0.12
    })*/
    //res.send('Página hwe 🤖')
})

app.get('/get', (req, res) => {             // Requisição do tipo get
    res.send('get 👉')
})


app.listen(3000, () => {
    console.log('Backend executando ...')
})