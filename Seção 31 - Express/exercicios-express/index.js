const express = require('express')  // quando está na pasta "node_modules", não é necessário colocar o endereço
const app = express()               // Passa todas as funções do express para a constante "app"

const bodyParser = require('body-parser')   // Trabalhar com o body das requisições

const saudacao = require('./saudacaoMid')   // Como foi exportado dentro do index, pode importar pelo "require"
const usuarioApi = require('./api/usuario') // forma padrão de importar os módulos
require('./api/produto') (app, 'Chamar passando parametro!') // Outra forma de importar módulos
// Outro modo de importar e passar parametros
/*const produtoApi = require('./api/produto')
produtoApi(app, 'Passar parametro!') */




app.use(bodyParser.text())  // pega apenas texto
app.use(bodyParser.json())  // Pega apenas json
app.use(bodyParser.urlencoded({extended: true}))    // Pega dados de formulário

app.use(saudacao('Jão'))    // Usando/chamando uma função Midlleware

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)


// Pode ter apenas uma saida (resposta) em cada "chamada"

// Ele para na primeira "chamada" q for aceito
// Se a primeira for a mais genérica (igual a abaixo), nunca acesssará as demais
//Toda vez que qualquer subdominio é acessado, ele vai ser chamado. Independentemente do método/requisição utilizado
app.use((req, res, next) => {
    //res.send('Acessou!!!')
    console.log('Entrou no domínio');
    next()
})

// Requisições do tipo "GET" passam parametros pela URL
// Requisições do tipo "POST" são passados no corpo da requisição
// URL => [localhost:3000/clientes/relatorio?completo=true&ano=2020]
app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo ${req.query.completo}, ano = ${req.query.ano}`)
})

// Tem que passar parametros pelo navegador 
// pode ser text, xml, json, ...
app.post('/corpo', (req, res) => {
    /*  //  Pegar o "body manualmente"
    let corpo = ''
    req.on('data', function(parte) {
        corpo += parte
    })

    req.on('end', function(){
        res.send(corpo)
    })*/

    // Pegar o body pela extensão
    res.send(req.body)
})

// Pegar informação pela URL (no caso, o parametro passado depois de "/clientes/", será chamado de "id" [:id])
app.get('/clientes/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
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