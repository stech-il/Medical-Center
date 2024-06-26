const QueueModel = require('../models/QueueModel');
const PatientModel = require('../models/PatientModel');
// Define the association
QueueModel.belongsTo(PatientModel, { foreignKey: 'PatientId' });
PatientModel.hasMany(QueueModel, { foreignKey: 'PatientId' });

// Fetch queue list by room with patient details
exports.getQueueListByRoom = async (roomId) => {
    return QueueModel.findAll({
        where: { RoomId: roomId },
        include: [
            {
                model: PatientModel,
                attributes: ['UniqeNumber']  // Use the correct field name here
            }
        ],
        order: [['PariortyNumber', 'ASC']]
    });
}
exports.findQueueByPatient = (patientId) => {
    return QueueModel.findAll({
        where: { PatientId: patientId }
    });
}

exports.findQueueById = (id) => {
    return QueueModel.findByPk(id);
}

exports.findAllQueue = () => {
    return QueueModel.findAll();
}


exports.updateQueue = (queueData) => {
    return QueueModel.update(queueData, {
        where: { id: queueData.ID }
    });
}

exports.deleteQueue = (id) => {
    return QueueModel.destroy({
        where: { id: id }
    });
}


exports.getFirstInQueueByRoom = async (roomId) => {
    return QueueModel.findOne({
        where: {
            RoomId: roomId
        },
        order: [['PariortyNumber', 'ASC']]
    });
}

exports.getLastInQueueByRoom = async (roomId) => {
    return QueueModel.findOne({
        where: { RoomId: roomId },
        order: [['PariortyNumber', 'DESC']]
    });
}

//regular appointment- to the last place in the queue
exports.createAppointment = async (patientId, roomId) => {
    try {
        console.log('Creating appointment for Patient ID:', patientId, 'in Room ID:', roomId);

        const lastInQueueByRoom = await this.getLastInQueueByRoom(roomId);
        const lastPriorityNumber = lastInQueueByRoom ? lastInQueueByRoom.PariortyNumber : 0;

        const data = {
            PatientId: patientId,
            RoomId: roomId,
            PariortyNumber: lastPriorityNumber + 1
        };
        console.log('Queue data to be inserted:', data);

        const appointmentEnter = await QueueModel.create(data);
        console.log('Appointment created:', appointmentEnter);

        return appointmentEnter;
    } catch (error) {
        console.error('Error in createAppointment:', error.message);
        throw new Error(error.message);
    }
};

exports.moveBetweenRooms = async (patientId, newRoomId, place) => {
    try {
        let priority;
        if (place === true) {
            const lastInQueue = await this.getLastInQueueByRoom(newRoomId);
            priority = lastInQueue ? lastInQueue.PariortyNumber + 1 : 1;
        } else {
            const firstInQueue = await this.getFirstInQueueByRoom(newRoomId);
            priority = firstInQueue ? firstInQueue.PariortyNumber - 1 : 1;
        }

        const queue = await this.findQueueByPatient(patientId);
        if (!queue || queue.length === 0) {
            throw new Error('Queue not found for patient');
        }
        const queueId = queue[0].ID;

        const data = {
            ID: queueId,
            PatientId: patientId,
            RoomId: newRoomId,
            PariortyNumber: priority
        };
        const appointmentUpdated = await this.updateQueue(data);

        return appointmentUpdated;
    } catch (error) {
        console.error('Error in moveBetweenRooms:', error.message);
        throw new Error(error.message);
    }
}
