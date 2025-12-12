const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');

router.get('/:sessionId', historyController.getHistory);
router.delete('/:sessionId', historyController.deleteHistory);

module.exports = router;
