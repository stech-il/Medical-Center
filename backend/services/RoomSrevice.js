const RoomsModel = require('../models/RoomModel');

exports.findRoomById = (id) => {
    return RoomsModel.findByPk(id);
}

exports.findRoomByName = (name) => {
    return RoomsModel.findOne({name:name});
}

exports.findAllRooms = () => {
    return RoomsModel.findAll();
}

exports.createRoom = async (roomData) => {
    try {
        const newRoom = await RoomsModel.create(roomData);
        return newRoom;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.updateRoom = (id, roomData) => {
    return RoomsModel.update(roomData, {
        where: { ID: id }
    });
}

exports.deleteRoom = (id) => {
    return RoomsModel.destroy({
        where: { ID: id }
    });
}
