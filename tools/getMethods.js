const model = require('../models/inviteeModel');

async function runDemo() {
  try {
    const allInvitees = await model.getAll();
    console.log('All Invitees:', allInvitees);

    const brideSide = await model.getBySide('B');
    console.log('Bride Side:', brideSide);
    
    const groomSide = await model.getBySide('G');
    console.log('Groom Side:', groomSideSide);

    const confirmed = await model.getConfirmed();
    console.log('Confirmed Guests:', confirmed);

    // Add one sample (uncomment if needed)
    // await model.addOne({ name: 'Test Guest', phone: '99887766', invited_count: 2, code: 'demo1234', side: 'G' });

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit();
  }
}

runDemo();