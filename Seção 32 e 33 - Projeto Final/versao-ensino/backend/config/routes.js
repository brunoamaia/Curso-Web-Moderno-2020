// "app" é importado pelo consign no Index, por isso não é importado aqui
module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)    // Inserir usuário >> >>  Forma de "chamar" como o [consign]: endereço do arquivo.método utilizado
        .get(app.api.user.get)      // Lista todos os usuários no BD

    app.route('/users/:id')
        .put(app.api.user.save)     // Atualizar informações do usuário
}