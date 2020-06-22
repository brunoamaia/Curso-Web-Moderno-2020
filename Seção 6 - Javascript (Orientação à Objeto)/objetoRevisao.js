// Coleção dinânimca de pares chave/valor
const produto = new Object
produto.nome = 'Cadeira'
produto['marca do produto'] = 'Genérica'    //Forma diferente de criar identificador (pode usar espaço, começar com número... Mas só pode ser acessado pelos colchetes)
produto.preco = 220

console.log(produto)

delete produto.preco
delete produto['marca do produto']
console.log(produto);

const carro = {
    modelo: 'A4',
    valor: 89000,
    proprietario: {
        nome: 'Raul',
        idade: 56,
        endereco: {
            logradouro: 'Rau ABC',
            numero: 123
        }
    },
    condutores: [{
        nome: 'Junior',
        idade: 19
    },{
        nome: 'Ana',
        idade: 42
    }],
    calcularValorSeguro: function () {
        //...
    }
}

carro.proprietario.endereco.numero=1000
carro['proprietario']['endereco']['logradouro'] = 'Av Gigante'
console.log('\nDetalhes do Carro');
console.log(carro);
console.log('Tamanho do vetor de Condutores:');
console.log(carro.condutores.length)

delete carro.condutores
delete carro.proprietario.endereco
delete carro.calcularValorSeguro

console.log('\nNovos dados');
console.log(carro);