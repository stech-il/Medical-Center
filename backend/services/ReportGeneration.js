const PatientModel = require('../models/PatientModel');
const ReportModel = require('../models/ReportsModel');
const HMOModel = require('../models/HMOModel');
const db = require('../database/db'); // Adjust the path as necessary

exports.generateDailyReport = async (date) => {
    try {
        // Parse the input date string and create start and end of the day
        const [year, month, day] = date.split('-').map(Number);
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            throw new Error('Invalid date format');
        }

        // Create date objects in the local timezone
        const theDate = new Date(year, month - 1, day+1);
        theDate.setHours(0, 0, 0, 0);

        const endDate = new Date(year, month - 1, day+1);
        endDate.setHours(23, 59, 59, 999);

        // Find all patients who checked in on the given date
        const patients = await PatientModel.findAll({
            where: {
                CheckIn: {
                    [db.Sequelize.Op.between]: [theDate, endDate]
                }
            },
            include: {
                model: HMOModel,
                attributes: ['ID', 'Name']
            }
        });

        // Count the number of patients per HMO
        const hmoPatientCount = {};
        patients.forEach(patient => {
            const hmoID = patient.HMOid;
            if (hmoPatientCount[hmoID]) {
                hmoPatientCount[hmoID].count += 1;
            } else {
                hmoPatientCount[hmoID] = {
                    name: patient.HMO.Name,
                    count: 1
                };
            }
        });

        // Fetch all HMOs to ensure all HMOs are included in the report
        const allHMOs = await HMOModel.findAll();
        allHMOs.forEach(hmo => {
            if (!hmoPatientCount[hmo.ID]) {
                hmoPatientCount[hmo.ID] = {
                    name: hmo.Name,
                    count: 0
                };
            }
        });

        // Generate or update reports for all HMOs
        const reportPromises = Object.keys(hmoPatientCount).map(async hmoID => {
            const existingReport = await ReportModel.findOne({
                where: {
                    hmoID: parseInt(hmoID),
                    currentDate: {
                        [db.Sequelize.Op.eq]: theDate
                    }
                }
            });

            if (existingReport) {
                // Update the existing report
                return ReportModel.update({
                    amountOfPatients: hmoPatientCount[hmoID].count
                }, {
                    where: {
                        ID: existingReport.ID
                    }
                });
            } else {
                // Create a new report
                return ReportModel.create({
                    hmoID: parseInt(hmoID),
                    currentDate: theDate,
                    amountOfPatients: hmoPatientCount[hmoID].count
                });
            }
        });

        await Promise.all(reportPromises);

        return { message: 'Reports generated and updated successfully.' };
    } catch (error) {
        throw new Error(`Error generating report: ${error.message}`);
    }
};
