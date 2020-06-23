let dobro = function(a) {
    return2*a
}

dobro = (a) => {
    return 2*a
}

dobro = a => 2*a //return implícito
console.log(dobro(Math.PI))

let ola = function () {
    return 'Olá'
}

ola = () => 'Olá'   // Função sem parametros
ola = _ => 'Olá'    // Função com apenas 1 parametro (que normalmente é ignorado)
console.log(ola())
