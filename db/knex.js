
require('dotenv').config();
const knex = require('knex');


const db = knex({
  client: 'pg',
  connection:{
    connectionString: process.env.DATABASE_URL||{
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE || 'postgres',
    port: process.env.PG_PORT || 5432,
  },
  ssl: {
    rejectUnauthorized: false,
  },
  },
});

module.exports = db;