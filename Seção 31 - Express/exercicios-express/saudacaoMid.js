function saudacao(nome) {   // Exemplo de função Midlleware
    return function(req, res, next) {   // Coloca dentro desta função para que seja executado toda vez que for requisitada
        console.log(`${nome}, seja bem vindo!!!`);
        next()
    }
}
module.exports = saudacao