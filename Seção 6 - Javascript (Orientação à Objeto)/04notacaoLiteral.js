const a = 1
const b = 2
const c = 3

const obj1 = { a: a, b: b, c: c  }  // Forma antiga de atribuir valor
const obj2 = { a, b, c }            // Nova forma, qunado a variável criada tem o mesmo nome que o  valor recebido
console.log(obj1, obj2);

const nomeAtt = 'nota'
const valorAtt = 7.29

const obj3 = {}
obj3[nomeAtt] = valorAtt
console.log(obj3);

const obj4 = { [nomeAtt]: valorAtt }
console.log(obj4);

const obj5 = {
    funcao1: function() {},     // Forma antiga de criar função no obj
    funcao2() {}                // Nova forma de criar função no objeto
}

console.log(obj5);
