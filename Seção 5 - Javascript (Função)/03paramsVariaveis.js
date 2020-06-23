function soma() {
    let soma = 0
    for(i in arguments) {   // aceesar valores que foram passados, mesmo não sendo necessário passar nehum valor
        soma += arguments[i]
    }
    return soma
}

console.log(soma());
console.log(soma(1));
console.log(soma(1.1, 2.2, 3.3));
console.log(soma(1.1, 2.2, 'Teste')); // como está sendo utilizada a função de soma, ela concatena
console.log('a', 'b', 'c');