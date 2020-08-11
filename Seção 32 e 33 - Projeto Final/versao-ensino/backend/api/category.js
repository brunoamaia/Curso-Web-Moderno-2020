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

  // Criar a lista (camimnho) das categorias
  const withPAth = categories => {
    // Buscar categorias "Pai"
    const getParent = (categories, parentId) => {
      const parent= categories.filter(parent => parent.id === parentId)
      return parent.length ? parent[0] : null
    }

    // Monta os caminhos
    const categoriesWithPath = categories.map(category => {
      let path = category.name
      let parent = getParent(categories, category.parentId)

      while(parent) {   // Recursividade para buscar os "pais"
        path = `${parent.name} > ${path}`
        parent = getParent(categories, parent.parentId)
      }
      return { ...category, path }
    })

    // Ordenar as categorias 
    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1
      if (a.path > b.path) return 1
      return 0
    })

    return categoriesWithPath
  }

  // Buscar/retornar as categorias
  const get = (req, res) => {
    app.db('categories')
      .then(categories => res.json(withPAth(categories)))
      .catch(err => res.status(500).send(err))
  }

  // Obter categoria pelo ID
  const getById = (req, res) => {
    app.db('categories')
      .where({ id: req.params.id})
      .first()
      .then(category => res.json(category))
      .catch(err => res.status(500).send(err))
  }

  return{ get, getById, remove, save }
}