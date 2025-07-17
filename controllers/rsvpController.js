const model = require('../models/rsvpModel');

exports.submitRsvp = async (req, res) => {
  const { phone, attending, guests } = req.body;

  try {
    const invitee = await model.findByPhone(phone);
    if (!invitee) return res.status(404).json({ message: 'Invitee not found' });

    if (attending) {
      await model.confirmAttendance(phone, guests);
      return res.status(202).json({ message: 'RSVP confirmed!' });
    } else {
      await model.rejectAttendance(phone);
      return res.status(200).json({ message: 'Sorry to hear that!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.checkPhone = async (req, res) => {
  const { phone} = req.query;

  try {
    const invitee = await model.findByPhone(phone);
    if (!invitee) return res.status(404).json({ message: 'Invitee not found' });

    res.json({
      name: invitee.name,
      invited_count: invitee.invited_count
    });
    // console.log('Invitee found:', res.json);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
