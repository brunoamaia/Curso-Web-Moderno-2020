// Usando a Notação Literal
console.log(`Notação Literal`);
const obj1 = {}
console.log(obj1);

// Object em JavaScript
console.log(`\nNotação Object`);
console.log(typeof Object, typeof new Object);
const obj2 = new Object
console.log(obj2);

// função construtora
console.log(`\nFunção construtora`);
function produto (nome, preco, desc) {
    this.nome = nome    // Torna a variável pública. Tira do encapsulamento
    this.getPrecoComDesconto = () => {  //  O método também fica visível 
        return preco*(1-desc)
    }
}

const produto1 = new produto('Caneta', 7.99, 0.15)
const produto2 = new produto('Notebook', 2998.99, 0.25)

console.log(`Produto 1: ${produto1.getPrecoComDesconto()}`);
console.log(`Produto 2: ${produto2.getPrecoComDesconto()}`);

// Função Facory
console.log(`\nFunção Factory`);
function criarFuncionario (nome, salarioBase, faltas) {
    return {    // Criar Objeto literal
        nome,
        salarioBase,
        faltas,
        getSalario(){
            return (salarioBase/30) * (30-faltas)
        }
    }
}


const funcionario1 = criarFuncionario('João', 7980, 4)
const funcionario2 = criarFuncionario('Maria', 11400, 1)
console.log(`Funcionário 1 = ${funcionario1.getSalario()}`);
console.log(`Funcionário 2 = ${funcionario2.getSalario()}`);

//Object.create
console.log('\nObject.create');
const filha = Object.create(null)
filha.nome = 'Ana'
console.log(filha);


// Uma função famosa que retorna um objeto... 
const fromJSON = JSON.parse('{"info": "Sou um JSON" }')
console.log(fromJSON.info)