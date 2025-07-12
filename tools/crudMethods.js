const model = require('../models/rsvpModel');


async function addOneInvitee(invitee) {
  try {
    await model.addOne(invitee);
    console.log('✅ Added one invitee:', invitee.name);
  } catch (err) {
    console.error('❌ Error adding one invitee:', err.message);
  }
}

async function addManyInvitees(invitees) {
  try {
    await model.addMany(invitees);
    console.log('✅ Added multiple invitees.');
  } catch (err) {
    console.error('❌ Error adding multiple invitees:', err.message);
  }
}

async function updateInviteeByPhone(phone, data) {
  if (!await model.findByPhone(phone)) {
    return console.error(`❌ Invitee with phone ${phone} does not exist.`);
  }
  try {
    await model.updateByPhone(phone, data);
    console.log(`✅ Updated invitee with phone ${phone}.`);
  } catch (err) {
    console.error(`❌ Error updating invitee with phone ${phone}:`, err.message);
  }
}

async function deleteInviteeByPhone(phone) {
  if(!await model.findByPhone(phone)) {
    return console.error(`❌ Invitee with phone ${phone} does not exist.`);
  }
  try {
    await model.deleteByPhone(phone);
    console.log(`✅ Deleted invitee with phone ${phone}.`);
  } catch (err) {
    console.error(`❌ Error deleting invitee with phone ${phone}:`, err.message);
  }
}

async function getAllInvitees() {
  try {
    const invitees = await model.getAll();
    console.log('📦 All invitees:', invitees);
    return invitees;
  } catch (err) {
    console.error('❌ Error getting all invitees:', err.message);
  }
}

async function getInviteesBySide(side) {
  try {
    const invitees = await model.getBySide(side);
    console.log(`📦 Invitees from side ${side}:`, invitees);
    return invitees;
  } catch (err) {
    console.error('❌ Error getting invitees by side:', err.message);
  }
}

async function getConfirmedInvitees() {
  try {
    const confirmed = await model.getConfirmed();
    console.log('📦 Confirmed invitees:', confirmed);
    return confirmed;
  } catch (err) {
    console.error('❌ Error getting confirmed invitees:', err.message);
  }
}

// ✅ Export all functions for use elsewhere
module.exports = {
  addOneInvitee,
  addManyInvitees,
  updateInviteeByPhone,
  deleteInviteeByPhone,
  getAllInvitees,
  getInviteesBySide,
  getConfirmedInvitees,
};


//Use fom another file like this:
// const inviteeService = require('./tools/inviteeService');

// ✅ Tested functions
//

// addOneInvitee({ name: 'Weam', phone: '96170878662', invited_count: 2, side: 'G' });
// addManyInvitees([
//   { name: 'Mahmoud', phone: '966539040339', invited_count: 2, side: 'G' },
//   { name: 'Salam', phone: '966535267655', invited_count: 2, side: 'G' }
// ])
// getAllInvitees();
// updateInviteeByPhone('96170878662', {invited_count: 1, is_attending: true});
// updateInviteeByPhone('96171279066', {invited_count: 5}); //does not exist
// deleteInviteeByPhone('96170223456'); //does not exist
//deleteInviteeByPhone('96170878662');
// getInviteesBySide('G')
// getInviteesBySide('B')
// getConfirmedInvitees() 

// inviteeService.getConfirmedInvitees().then((confirmed) => {
//   console.log('Confirmed:', confirmed);
// });