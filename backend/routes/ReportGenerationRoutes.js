const express = require('express');
const router = express.Router();
const ReportGenerationController = require('../controllers/ReportGenerationController');

// Generate a daily report
router.post('/generate', ReportGenerationController.generateDailyReport);

module.exports = router;
