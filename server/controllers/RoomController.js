import RoomModel from "../models/RoomModel.js";


export const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.findAll()
        res.json(rooms)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getRoomByID = async (req, res) => {
    try {
        const rooms = await RoomModel.findAll({
            where: {id: req.params.id}
        })
        res.json(rooms[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createRoom = async (req, res) => {
        try {
            await RoomModel.create(req.body)
            res.json({
                "message":"created successfully!"
            })
        } catch (error) {
            res.json({message: error.message})
        }
    }

export const updateRoom = async(req, res) => {
    try {
        await RoomModel.update(req.body, {
            where: {id:req.params.id}
        })
        res.json({
            "message" : "Updated successfully!"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


export const deleteRoom = async( req, res) => {
    try {
        await RoomModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message" : "deleted successfully"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}