// "app" é importado pelo consign no Index, por isso não é importado aqui
const admin = require('./admin')

module.exports = app => {
	app.post('/signup', app.api.user.save)
	app.post('/signin', app.api.auth.signin)								// Autenticar login
	app.post('/validateToken', app.api.auth.validateToken)

	app.route('/users')
		.all(app.config.passport.authenticate())	// Só permite acessar os métodos, após autenticar
  	.get(admin(app.api.user.get))      // Lista todos os usuários no BD
		.post(admin(app.api.user.save))  // Inserir usuário >> >>  Forma de "chamar" como o [consign]: endereço do arquivo.método utilizado

  app.route('/users/:id')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.user.getById))  // Selecionar usuário por ID
		.put(admin(app.api.user.save))     // Atualizar informações do usuário

  app.route('/categories')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.category.get))		// Listar todas as categorias 
		.post(admin(app.api.category.save))	// Inserir categoria 

	// A ordem é importante. A função deve vir antes do parâmetro
	app.route('/categories/tree')
		.all(app.config.passport.authenticate())
		.get(app.api.category.getTree)

  app.route('/categories/:id')
		.all(app.config.passport.authenticate())
		.delete(admin(app.api.category.remove)) // Deletar usuário por ID
		.get(app.api.category.getById)    			// Selecionar usuário por ID
		.put(admin(app.api.category.save))      // Atualizar informações do usuário

	app.route('/articles')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.article.get))
		.post(admin(app.api.article.save))

	app.route('/articles/:id')
		.all(app.config.passport.authenticate())
		.get(app.api.article.getById)
		.put(admin(app.api.article.save))
		.delete(admin(app.api.article.remove))

	app.route('/categories/:id/articles')
		.all(app.config.passport.authenticate())
		.get(app.api.article.getByCategory)
}	