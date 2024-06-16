const MessagesService = require('../services/MessagesService');

exports.findMessageById = async (req, res) => {
    try {
        const message = await MessagesService.findMessageById(req.params.id);
        if (message) {
            return res.json({
                data: message,
                message: 'Success.'
            });
        } else {
            return res.status(404).json({
                message: 'Message not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.findAllMessages = async (req, res) => {
    try {
        const messages = await MessagesService.findAllMessages();
        return res.json({
            data: messages,
            message: 'Success.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.createMessage = async (req, res) => {
    try {
        const { message, status } = req.body;
        if (!message || !status) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const newMessage = await MessagesService.createMessage(message, status);
        return res.status(201).json({
            data: newMessage,
            message: 'Patient created successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await MessagesService.updateMessage(req.params.id, req.body);
        if (updatedMessage[0] === 1) { // Sequelize returns an array with the number of affected rows
            return res.json({
                message: 'Message updated successfully.'
            });
        } else {
            return res.status(404).json({
                message: 'Message not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const deleted = await MessagesService.deleteMessage(req.params.id);
        if (deleted) {
            return res.json({
                message: 'Message deleted successfully.'
            });
        } else {
            return res.status(404).json({
                message: 'Message not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
