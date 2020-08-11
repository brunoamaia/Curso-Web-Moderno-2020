module.exports = app => {
  const { existOrError, notExistOrError } = app.api.validation

  // Incluir e alterar categoria
  const save = (req, res) => {
    const category = { ...req.body }

    if (req.params.id) category.id = req.params.id

    try { //Validar nome da categoria
      existOrError(category.name, 'Nome não informado')
    } catch(msg) {
      return res.status(400).send(msg)
    }

    if (category.id) {  // Atualizar Categoria
      app.db('categories')
        .update(category)
        .where({ id: category.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {            // Criar Categoria
      app.db('categories')
        .insert(category)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  // Remover categorias
  const remove = async (req, res) => {
    try {   // Validar o ID da categoria
      existOrError(req.params.id, 'Código da categoria não foi informado.')

      // Verificar se existem subcategorias da categoria informada/selecionada
      const subcategory = await app.db('categories')
        .where({ parentId: req.params.id })
      notExistOrError(subcategory, 'Categoria possui subcategorias.')

      // Verificar se existem artigos associados a categoria
      const articles = await app.db('articles')
        .where({ categoryId: req.params.id })
      notExistOrError(articles, 'Categoria possui artigos associados.')

      // Deletar a categoria
      const rowDeleted = await app.db('categories')
        .where({ id: req.params.id }).del()
      existOrError(rowDeleted, 'Categoria não foi encontrada.')

      res.status(204).send()

    } catch (msg) {
      res.status(400).send(msg)
    }
  }

  
}