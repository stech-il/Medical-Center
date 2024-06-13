const express = require('express');
const router = express.Router();

const HMOsController = require('../controllers/HMOsController');

router.get('/:id', HMOsController.findHMOById);

module.exports = router;
