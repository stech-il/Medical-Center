const PatientsModel = require('../models/PatientsModel');


exports.findPatientById = (id) => {
    return PatientsModel.findByPk(id);
}

exports.findAllPatients = () => {
    return PatientsModel.findAll();
}


exports.updatePatient = (id, patientData) => {
    return PatientsModel.update(patientData, {
        where: { id: id }
    });
}

exports.deletePatient = (id) => {
    return PatientsModel.destroy({
        where: { id: id }
    });
}

exports.createPatient = async (firstName, lastName, HMOid, phone) => {
    try {
        const uniqueNumber = await generateNumber();
        const data = {
            UniqeNumber: uniqueNumber,
            FirstName: firstName,
            LastName: lastName,
            Phone: phone,
            HMOid: HMOid,
            CheckIn: new Date(),
            CheckOut: new Date(),
            Status: true
        };

        const patientEnter = await PatientsModel.create(data);
        
        return patientEnter;
    } catch (error) {
        throw new Error(error.message);
    }
};

async function generateNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const i = Math.floor(Math.random() * 10);
    const k = Math.floor(Math.random() * 10);
    const j = Math.floor(Math.random() * 26);
    const number = letters[j] + numbers[i] + numbers[k];

    const allPatients = await findAllPatients();

    if (!allPatients.some(patient => patient.UniqeNumber === number)) {
        return number;
    } else {
        return generateNumber();
    }
}