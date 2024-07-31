const ReportModel = require('../models/ReportsModel');

exports.findReportById = (id) => {
    return ReportModel.findByPk(id);
};

exports.findAllReports = () => {
    return ReportModel.findAll();
};

exports.updateReport = (id, reportData) => {
    return ReportModel.update(reportData, {
        where: { ID: id }
    });
};

exports.deleteReport = (id) => {
    return ReportModel.destroy({
        where: { ID: id }
    });
};

exports.createReport = async (hmoID, date = new Date(), amountOfPatients = 0) => {
    try {
        const data = {
            hmoID,
            date,
            amountOfPatients
        };

        const report = await ReportModel.create(data);
        return report;
    } catch (error) {
        throw new Error(error.message);
    }
};
