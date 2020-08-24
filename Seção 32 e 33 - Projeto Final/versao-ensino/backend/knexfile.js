// Update with your settings.
const { db } = require('./.env')  // informações de conexão com o BD

module.exports = {
  client: 'postgresql',
  connection: db,
  
  pool: {
    min: 2,
    max: 10
  },
  
  migrations: {
    tableName: 'knex_migrations'
  }
};
