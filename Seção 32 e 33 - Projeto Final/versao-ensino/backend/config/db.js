const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config])   // Chama todas as migrations ao "subir" o servidor
module.exports = knex