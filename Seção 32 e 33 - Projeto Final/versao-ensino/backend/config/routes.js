// "app" é importado pelo consign no Index, por isso não é importado aqui
module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)    // Forma de "chamar" como o [consign]: endereço do arquivo.método utilizado
}