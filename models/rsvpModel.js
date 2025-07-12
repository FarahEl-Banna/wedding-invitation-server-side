const db = require('../db/knex');

console.log('db loaded:', typeof db,);

// db.raw('SELECT 1')
//   .then(() => console.log('✅ PostgreSQL connection successful'))
//   .catch((err) => console.error('❌ PostgreSQL connection failed:', err));

const crypto = require('crypto');

function generateCode() {
  return crypto.randomBytes(4).toString('hex'); // Example: "9f1d3c2b"
}

exports.findByCode = (code) => db('invitees').where({ code }).first();

exports.findByPhone = (phone) => db('invitees').where({ phone }).first();

exports.confirmAttendance = (phone, confirmed_count) =>
  db('invitees')
    .where({ phone })
    .update({ is_attending: true, confirmed_count });

exports.rejectAttendance = (phone) =>
  db('invitees')
    .where({ phone })
    .update({ is_attending: false, confirmed_count: 0 });

  exports.addOne=(invitee) => db('invitees').insert({...invitee, code: generateCode()});

  exports.addMany = (invitees) => db('invitees').insert(invitees.map((person) => ({
    ...person,
    code: generateCode(),
  })));
  exports.deleteByPhone = (phone) => db('invitees').where({ phone }).del();
  exports.updateByPhone=(phone, data) => db('invitees').where({ phone }).update(data);
  exports.getAll=() => db('invitees').select();
  exports.getBySide=(side) => db('invitees').where({ side }).select();
  exports.getConfirmed=() => db('invitees').where({ is_attending: true }).select();
