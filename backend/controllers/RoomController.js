import RoomModel from "../models/RoomModel.js";


export const getAllRooms = async (req, res) => {
    try {
        const blogs = await RoomModel.findAll()
        res.json(blogs)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getRoomByID = async (req, res) => {
    try {
        const blogs = await RoomModel.findAll()
        res.json(blogs)
    } catch (error) {
        res.json({message: error.message})
    }
}