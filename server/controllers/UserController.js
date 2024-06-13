import UserModel from "../models/UserModel.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getUserByID = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            where: {id: req.params.id}
        })
        res.json(users[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createUser = async (req, res) => {
        try {
            await UserModel.create(req.body)
            res.json({
                "message":"created successfully!"
            })
        } catch (error) {
            res.json({message: error.message})
        }
    }

export const updateUser = async(req, res) => {
    try {
        await UserModel.update(req.body, {
            where: {id:req.params.id}
        })
        res.json({
            "message" : "Updated successfully!"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}


export const deleteUser = async( req, res) => {
    try {
        await UserModel.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message" : "deleted successfully"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}