const UsersService = require('../services/UsersService');

exports.findUserById = async (req, res) => {
    try {
        const user = await UsersService.findUserById(req.params.id);
        if (user) {
            return res.json({
                data: user,
                message: 'Success.'
            });
        } else {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.findAllUsers = async (req, res) => {
    try {
        const users = await UsersService.findAllUsers();
        return res.json({
            data: users,
            message: 'Success.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = await UsersService.createUser(req.body);
        return res.status(201).json({
            data: newUser,
            message: 'User created successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await UsersService.updateUser(req.params.id, req.body);
        if (updatedUser[0] === 1) { // Sequelize returns an array with the number of affected rows
            return res.json({
                message: 'User updated successfully.'
            });
        } else {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
exports.getPatientsWithQueueDetails = async (req, res) => {
    try {
       
        const queueList = await QueueService.getQueueListByRoom(roomId);
        console.log('Queue list:', queueList); // Add logging here
        res.json(queueList);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await UsersService.deleteUser(req.params.id);
        if (deleted) {
            return res.json({
                message: 'User deleted successfully.'
            });
        } else {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
