const express = require('express');
const router = express.Router();

const integrationController = require('../controllers/integration.controller');

router.post('/integration', integrationController.add);
router.get('/allintegration', integrationController.all_integration);
module.exports = router;