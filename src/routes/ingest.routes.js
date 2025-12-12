const express = require('express');
const router = express.Router();
const ingestController = require('../controllers/ingest.controller');

router.post('/', ingestController.ingest);

module.exports = router;
