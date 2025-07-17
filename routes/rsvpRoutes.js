const express = require('express');
const router = express.Router();
const controller = require('../controllers/rsvpController');
const codeController = require('../controllers/codeController');

router.post('/rsvp', controller.submitRsvp);

router.get('/check-phone', controller.checkPhone);

router.get('/check-code', codeController.checkCode);

router.post('/add', codeController.addOne);
router.post('/add-many', codeController.addMany);
router.delete('/:phone', codeController.deleteByPhone);
router.put('/:phone', codeController.updateByPhone);
router.get('/getall', codeController.getAll);
router.get('/side/:side', codeController.getBySide);
router.get('/confirmed', codeController.getConfirmed);
router.get('/declined', codeController.getDeclined);

module.exports = router;