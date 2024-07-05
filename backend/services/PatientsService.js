const PatientModel = require('../models/PatientModel');
const QueueService=require('./QueueService'); 
const RoomService=require('./RoomSrevice')
const QueueModel = require('../models/QueueModel');
const RoomModel = require('../models/RoomModel');

QueueModel.belongsTo(PatientModel, { foreignKey: 'PatientId' });
PatientModel.hasMany(QueueModel, { foreignKey: 'PatientId' });

QueueModel.belongsTo(RoomModel, { foreignKey: 'RoomId' });
RoomModel.hasMany(QueueModel, { foreignKey: 'RoomId' });

exports.getAllPatientsWithQueueDetails = async () => {
    try {
        const patients = await PatientModel.findAll({
            include: [
                {
                    model: QueueModel,
                    attributes: ['PariortyNumber', 'RoomId'],
                    include: [
                        {
                            model: RoomModel,
                            attributes: ['Name']
                        }
                    ]
                }
            ],
        });

        if (!patients || patients.length === 0) {
            throw new Error('Patient not found.');
        }

        return patients;
    } catch (error) {
        console.error('Error fetching patients with queue details:', error.message);
        throw new Error('Patient not found.');
    }
};


exports.findPatientById = (id) => {
    return PatientModel.findByPk(id);
}

exports.findAllPatients = () => {
    return PatientModel.findAll();
}


exports.updatePatient = (id, patientData) => {
    return PatientModel.update(patientData, {
        where: { id: id }
    });
}

exports.deletePatient = (id) => {
    return PatientModel.destroy({
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

        const patientEnter = await PatientModel.create(data);
        console.log('Patient created:', patientEnter);

        const receptionRoomID = await RoomService.findRoomByName('קבלה');
        console.log('Reception Room ID:', receptionRoomID);

        if (!receptionRoomID) {
            throw new Error('Reception room not found or invalid ID');
        }

        await QueueService.createAppointment(patientEnter.ID, receptionRoomID);

        return patientEnter;
    } catch (error) {
        console.error('Error in createPatient:', error.message);
        throw new Error(error.message);
    }
};


async function generateNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const i = Math.floor(Math.random() * 10);
    const k = Math.floor(Math.random() * 10);
    const j = Math.floor(Math.random() * 26);
    const number = letters[j] +'-' +numbers[i] + numbers[k];

    const allPatients = await PatientModel.findAll();

    if (!allPatients.some(patient => patient.UniqeNumber === number)) {
        return number;
    } else {
        return generateNumber();
    }
}