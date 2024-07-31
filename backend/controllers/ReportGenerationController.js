const ReportsService = require('../services/ReportGeneration');

exports.generateDailyReport = async (req, res) => {
    try {
        const { date } = req.body;
        if (!date) {
            return res.status(400).json({
                message: 'Date is required.'
            });
        }

        const result = await ReportsService.generateDailyReport(date);
        return res.status(200).json({
            message: result.message
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};