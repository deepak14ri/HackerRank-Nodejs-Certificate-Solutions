const router = require('express').Router();
const controller = require('../controllers/reminders');

// POST /reminders
router.post('/', controller.createReminder);

// GET /reminders
router.get('/', controller.getReminders);

// GET /reminders/:id
router.get('/:id', controller.getReminderById);

// DELETE, PUT, PATCH /reminders/:id
router.delete('/:id', controller.methodNotAllowed);
router.put('/:id', controller.methodNotAllowed);
router.patch('/:id', controller.methodNotAllowed);

module.exports = router;
