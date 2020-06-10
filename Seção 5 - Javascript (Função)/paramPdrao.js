// estratégia 1 para gerasr valor padrão 

function soma1(a, b, c) {
    a = a || 1  // Caso o valor não seja válido, recebe 1
    b = b || 1
    c = c || 1
    return a+b+c
}
console.log(soma1(), soma1(3), soma1(1, 2, 3));
console.log(soma1(0, 0, 0))     // zero é entendido como não válido, portanto será atribuido 1

// Estratégia 2,3 e 4 para gerar valor padrão
function soma2(a, b, c) {
    a = a !== undefined ? a : 1     // se não for indefinido, recebe "a", caso seja indefinnido, recebe 1 
    b = 1 in arguments ? b : 1      // in arguments - pega os elementos passados para a função (as posições começam em 0, portanto o 1 é referene ao segundo valor passado)
    c = isNaN(c) ? 1 : c            // se não é numero recebe 1, se for número, pega o valor passado
    return a+b+c
}
console.log(soma2(), soma2(3), soma2(1, 2, 3));
console.log(soma2(0, 0, 0))


// valor padrão do ES2015
function  soma3(a=1, b=1, c=1) {
    return a+b+c
}
console.log(soma3(), soma3(3), soma3(1, 2, 3));
console.log(soma3(0, 0, 0))