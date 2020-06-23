const pessoa = {
    saudacao: 'Bom dia!',
    falar() {
        console.log(this.saudacao)
    }
}
pessoa.falar()

const falar = pessoa.falar
falar()     // Conflito entre paradigimas: funcional e OO


// O bind "direciona" o this. 
const falarDePessoa = pessoa.falar.bind(pessoa)
falarDePessoa()