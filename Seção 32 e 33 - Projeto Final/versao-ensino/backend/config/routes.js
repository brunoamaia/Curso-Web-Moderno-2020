// "app" é importado pelo consign no Index, por isso não é importado aqui
module.exports = app => {
  app.route('/users')
  	.get(app.api.user.get)      // Lista todos os usuários no BD
		.post(app.api.user.save)    // Inserir usuário >> >>  Forma de "chamar" como o [consign]: endereço do arquivo.método utilizado

  app.route('/users/:id')
		.get(app.api.user.getById)  // Selecionar usuário por ID
		.put(app.api.user.save)     // Atualizar informações do usuário

  app.route('/categories')
		.get(app.api.category.get)		// Listar todas as categorias 
		.post(app.api.category.save)	// Inserir categoria 

  app.route('/categories/:id')
		.delete(app.api.category.remove)  // Deletar usuário por ID
		.get(app.api.category.getById)    // Selecionar usuário por ID
		.put(app.api.category.save)       // Atualizar informações do usuário

}	