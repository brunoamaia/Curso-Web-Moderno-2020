module.exports = app => {
  const Stat = app.mongoose.model('Stat', {
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date
  })

  const get = (req, res) => {
    Stat.findOne({}, {}, {sort: {'createdAt': -1}})
      //.then(stat => res.json(stat))     // Forma padrão de enviar os dados que chegaram
      .then(stat => {
        const defaultStat = {
          users: 0,
          categories: 0,
          articles: 0
        }
        res.json(stat || defaultStat)   // Criar dados "genéricos" para caso ainda não tenha nenhum dado
      })
  }

  return{ Stat, get}
}