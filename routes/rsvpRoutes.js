const express = require('express');
const router = express.Router();
const controller = require('../controllers/rsvpController');
const codeController = require('../controllers/codeController');

router.post('/rsvp', controller.submitRsvp);

router.get('/check-phone', controller.checkPhone);

router.get('/check-code', codeController.checkCode);


module.exports = router;