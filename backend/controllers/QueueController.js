const QueueService = require('../services/QueueService');
const RoomServise = require('../services/RoomSrevice');


exports.findQueueById = async (req, res) => {
    try {
        const queue = await QueueService.findQueueById(req.params.id);
        if (queue) {
            return res.json({
                data: queue,
                message: 'Success.'
            });
        } else {
            return res.status(404).json({
                message: 'Queue not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


exports.getQueueListByRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        console.log(roomId)
        const queueList = await QueueService.getQueueListByRoom(roomId);
        console.log('Queue list:', queueList); // Add logging here
        res.json(queueList);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


exports.findAllQueues = async (req, res) => {
    try {
        const queues = await QueueService.findAllQueue();
        return res.json({
            data: queues,
            message: 'Success.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.createQueue = async (req, res) => {
    try {
        const newQueue = await QueueService.createQueue(req.body);
        return res.status(201).json({
            data: newQueue,
            message: 'Queue created successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.updateQueue = async (req, res) => {
    try {
        const updatedQueue = await QueueService.updateQueue(req.params.id, req.body);
        if (updatedQueue[0] === 1) { // Sequelize returns an array with the number of affected rows
            return res.json({
                message: 'Queue updated successfully.'
            });
        } else {
            return res.status(404).json({
                message: 'Queue not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.deleteQueue = async (req, res) => {
    try {
        const deleted = await QueueService.deleteQueue(req.params.id);
        if (deleted) {
            return res.json({
                message: 'Queue deleted successfully.'
            });
        } else {
            return res.status(404).json({
                message: 'Queue not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
