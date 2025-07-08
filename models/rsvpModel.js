const db = require('../db/knex');

console.log('db loaded:', typeof db,);

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