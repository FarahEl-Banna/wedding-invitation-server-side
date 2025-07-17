
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

const crypto = require('crypto');

function generateCode() {
  return crypto.randomBytes(4).toString('hex');
}

exports.addOne = async (req, res) => {
  try {
    const invitee = { ...req.body, code: generateCode() };
    await model.addOne(invitee);
    res.json({ message: 'Invitee added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMany = async (req, res) => {
  try {
     const invitees = req.body.map((invitee) => ({
      ...invitee,
      code: generateCode(),
    }));
    await model.addMany(invitees); // array of objects
    res.json({ message: 'Invitees added',count: invitees.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteByPhone = async (req, res) => {
  if(!await model.findByPhone(req.params.phone)){
    return res.json({ message: 'Phone number dose not exist, Invitee cannot be deleted' });
  }
  try {
    await model.deleteByPhone(req.params.phone);
    res.json({ message: 'Invitee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateByPhone = async (req, res) => {
  if(!await model.findByPhone(req.params.phone)){
    return res.json({ message: 'Phone number dose not exist, Invitee cannot be updated' });
  }
  try {
    await model.updateByPhone(req.params.phone, req.body);
    res.json({ message: 'Invitee updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (_, res) => {
  try {
    const data = await model.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySide = async (req, res) => {
  try {
    const side = req.params.side;
    const data = await model.getBySide(side);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConfirmed = async (_, res) => {
  try {
    const data = await model.getConfirmed();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeclined = async (_, res) => {
  try {
    const data = await model.getDeclined();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};