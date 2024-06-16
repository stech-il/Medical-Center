const QueuesModel = require('../models/QueueModel');
const RoomModel = require('../models/RoomModel');

//each patient can be in just 1 queue in certain time
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


exports.updateQueue = (id, queueData) => {
    return QueueModel.update(queueData, {
        where: { id: id }
    });
}

exports.deleteQueue = (id) => {
    return QueueModel.destroy({
        where: { id: id }
    });
}

exports.getFirstInQueueByRoom = (roomId) => {
    return QueueModel.find({ roomId }).sort({ pariortyNumber: 1 })[0];
}

exports.getLastInQueueByRoom = (roomId) => {
    return QueueModel.find({ roomId }).sort({ pariortyNumber: -1 })[0];
}

//regular appointment- to the last place in the queue
exports.createAppointment = async (patientId, roomId) => {
    try {

        const lastInQueueByRoom = await this.getLastInQueueByRoom(roomId);

        const data = {
            PatientId: patientId,
            RoomId: roomId,
            PariortyNumber: lastInQueueByRoom + 1
        };
        const appointmentEnter = await QueueModel.create(data);

        return appointmentEnter;
    } catch (error) {
        throw new Error(error.message);
    }
};


exports.moveBetweenRooms = async (patientId, newRoomId, place) => {
    try {
        const priority = 0;
        if (place == true) {
            priority = await this.getLastInQueueByRoom(roomId) + 1;
        }
        else {
            priority = await this.getFirstInQueueByRoom(roomId) - 1;
        }

        const data = {
            ID: this.findQueueByPatient(patientId),
            PatientId: patientId,
            RoomId: newRoomId,
            PariortyNumber: priority
        };
        const appointmentUpdated = await QueueModel.update(data);

        return appointmentUpdated;
    } catch (error) {
        throw new Error(error.message);
    }
}
