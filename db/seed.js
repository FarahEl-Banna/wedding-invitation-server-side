const db = require('./knex');
const fs = require('fs');
const path = require('path');

async function seed() {
  await db.schema.dropTableIfExists('invitees');
  await db.schema.createTable('invitees', (table) => {
    table.increments('id');
    table.string('name');
    table.string('phone').unique();
    table.integer('invited_count');
    table.boolean('is_attending').defaultTo(null);
    table.integer('confirmed_count').defaultTo(0);
    table.string('code').unique().notNullable();
    //for Bride/Groom side
    table.enu('side', ['B', 'G']).nullable();
  });

  const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'invitees.json')));
   const invitees = rawData.map((person) => ({
    ...person,
    code: generateCode(),
  }));
  
  await db('invitees').insert(invitees);

  console.log(' Invitees seeded');
}

const crypto = require('crypto');

function generateCode() {
  return crypto.randomBytes(4).toString('hex'); // Example: "9f1d3c2b"
}

seed();