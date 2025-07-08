
const model = require('../models/rsvpModel');

exports.checkCode = async (req, res) => {
  const { code } = req.query;
  try {
    const invitee = await model.findByCode(code);
    
    if (!invitee) return res.status(404).json({ message: 'Invalid code' });

    res.json({
      name: invitee.name,
      invited_count: invitee.invited_count,
      phone: invitee.phone,
      is_attending: invitee.is_attending,
      side: invitee.side,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};