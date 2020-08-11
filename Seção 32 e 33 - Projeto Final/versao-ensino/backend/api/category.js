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
}