// Referencia um endereço de memória para o atributo criado
const pessoa = { nome: 'João'}
pessoa.nome = 'Pedro'   // Altera o valor do atributo. Ele continua no mesmo endereço
console.log(pessoa);

// Criar novo atributo da erro, pois modifica o endereço da memoria
//pessoa = {idade: 23}          // cria um novo atributo, o que não é permitido em constante
//pessoa = { nome: 'Chico'}     // mesmo sendo com o mesmo nome, aponta para outro endereço. Também não é permitido

let gente = {nome: 'João '}
gente = {nome: 'Ana'}       // substitui o atributo anterior, ao criar um novo com o mesmo nome (no caso "nome")
console.log(gente);

Object.freeze(pessoa)       // Congela os valores. Usando este comando, as mudanças que são passadas, serão ignoradas 
pessoa.nome = 'Paulo'       // Será ignorado. Não dá nenhum erro, mas também não altera o valor.
pessoa.end = 'Av 123'       // Não pode adicionar nada (já não podia por ser constante, mas o freeze não deixa dar erro)
delete pessoa.nome          // Não permite apagar valores

console.log(pessoa);

const pessoaConstante = Object.freeze( {nome: 'Mário'} )    // Constante imutável
console.log(pessoaConstante);
