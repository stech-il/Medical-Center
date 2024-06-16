const MessagesModel = require('../models/MessagesModel');

exports.findMessageById = (id) => {
    return MessagesModel.findByPk(id);
}

exports.findAllMessages = () => {
    return MessagesModel.findAll();
}


exports.updateMessage = (id, message) => {
    return MessagesModel.update(message, {
        where: { id: id }
    });
}

exports.deleteMessage = (id) => {
    return MessagesModel.destroy({
        where: { id: id }
    });
}

exports.createMessage = async (message, status) => {
    try {
        const data = {
            Message: message,
            Status: status
        };

        const newMessage = await MessagesModel.create(data);
        return newMessage;
    } catch (error) {
        throw new Error(error.message);
    }
}