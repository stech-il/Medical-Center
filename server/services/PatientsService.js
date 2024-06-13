const PatientsModel = require('../models/PatientsModel');

exports.findPatientById = (id) => {
    return PatientsModel.findByPk(id);
}

exports.findAllPatients = () => {
    return PatientsModel.findAll();
}

// exports.createPatient = (patientData) => {
//     return PatientsModel.create(patientData);
// }

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


exports.createPatient = async (firstName, lastName, HMOid) => {
    try {
        const uniqueNumber = await generateNumber();
        const data = {
            UniqeNumber: uniqueNumber,
            FirstName: firstName,
            LastName: lastName,
            Phone: '0526589658',  // Example static phone number
            HMOid: HMOid,  // Ensure HMOid is included
            CheckIn: new Date(),
            CheckOut: null,
            Status: 1
        };

        // Create MainTable entry
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
    const j = Math.floor(Math.random() * 26);
    const number = letters[j] + numbers[i];

    const AllPatients = await exports.findAllPatients();

    if (!AllPatients.some(entry => entry.UniqeNumber === number)) {
        return number;
    } else {
        return generateNumber();
    }

}