const UsersModel = require('../models/UserModel');
const UsersService = require('../services/UsersService');

const bcrypt = require('bcryptjs');

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

exports.findUserByEmailAddress = async (req, res) => {
    try {
        const user = await UsersService.findUserByEmailAddress(req.params.Email);
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
        bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
                bcrypt.hash(req.body.Password, salt, function(err, hashPassword) {
                    if (!err) {
                        console.log("hashPassword ", hashPassword);
                        req.body.Password = hashPassword;
                        UsersService.createUser(req.body);
                    }
                });
            }
        });
        
        return res.status(201).json({
            data: req,
            message: 'User created successfully.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.userLogin = async (req, res) => {
    // try {
    //     const user = await UsersService.login(req.body.Email, req.body.Password);
    //     return res.json({
    //         data: user,
    //         message: 'Success.'
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         message: 'Internal Server Error',
    //         error: error.message
    //     });
    // }
    try {
        const { email, password } = req.body;
        const loggedIn = await UsersService.userLogin(email, password);
        console.log(loggedIn);
        if (loggedIn) {
            return res.json({
                message: 'Login successful'
            });
        } else {
            return res.status(401).json({
                message: 'Login failed. Invalid credentials.'
            });
        }
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
