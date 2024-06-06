const router = require('express').Router();
const { postAnalytics, getAnalytics, methodNotAllowed } = require('../controllers/analytics');

router.post('/', postAnalytics);
router.get('/', getAnalytics);
router.put('/:id', methodNotAllowed);
router.delete('/:id', methodNotAllowed);
router.patch('/:id', methodNotAllowed);

module.exports = router;
