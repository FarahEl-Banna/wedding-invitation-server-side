const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db/invitees.sqlite'
  },
  useNullAsDefault: true
});

module.exports = db;