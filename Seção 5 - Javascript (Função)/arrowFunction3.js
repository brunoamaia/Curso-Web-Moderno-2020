let comparaComThis = function (param) {
    console.log(this === param)
}
comparaComThis(global)  // No navegador o objeto global é o window

const obj = {}
comparaComThis = comparaComThis.bind(obj)
comparaComThis(global)
comparaComThis(obj)


let comparaComThisArrow = param => console.log(this === param)  // o this de arrow function fica dentro de seu módulo
comparaComThisArrow(global)
comparaComThisArrow(module.exports)

comparaComThisArrow = comparaComThisArrow.bind(obj)         // Mesmo usando o bind, não é possivel modificar o this de uma Arrow Function
comparaComThisArrow(obj)
comparaComThisArrow(module.exports)