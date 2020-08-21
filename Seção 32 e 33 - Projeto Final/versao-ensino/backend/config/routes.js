// "app" é importado pelo consign no Index, por isso não é importado aqui
module.exports = app => {
	app.post('/signup', app.api.user.save)
	app.post('/signin', app.api.auth.signin)								// Autenticar login
	app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
  	.get(app.api.user.get)      // Lista todos os usuários no BD
		.post(app.api.user.save)    // Inserir usuário >> >>  Forma de "chamar" como o [consign]: endereço do arquivo.método utilizado

  app.route('/users/:id')
		.get(app.api.user.getById)  // Selecionar usuário por ID
		.put(app.api.user.save)     // Atualizar informações do usuário

  app.route('/categories')
		.get(app.api.category.get)		// Listar todas as categorias 
		.post(app.api.category.save)	// Inserir categoria 

	// A ordem é importante. A função deve vir antes do parâmetro
	app.route('/categories/tree')
		.get(app.api.category.getTree)

  app.route('/categories/:id')
		.delete(app.api.category.remove)  // Deletar usuário por ID
		.get(app.api.category.getById)    // Selecionar usuário por ID
		.put(app.api.category.save)       // Atualizar informações do usuário

	app.route('/articles')
		.get(app.api.article.get)
		.post(app.api.article.save)

	app.route('/articles/:id')
		.get(app.api.article.getById)
		.put(app.api.article.save)
		.delete(app.api.article.remove)

	app.route('/categories/:id/articles')
		.get(app.api.article.getByCategory)
}	