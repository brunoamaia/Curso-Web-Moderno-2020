function saudacao(nome) {   // Exemplo de função Midlleware
    return function(req, res, next) {
        console.log(`${nome}, seja bem vindo!!!`);
        next()
    }
}
module.exports = saudacao