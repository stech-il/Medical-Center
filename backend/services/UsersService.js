const UsersModel = require('../models/UserModel');

const bcrypt = require('bcryptjs');

exports.findUserById = (id) => {
    return UsersModel.findByPk(id);
}

exports.findAllUsers = () => {
    return UsersModel.findAll();
}

exports.createUser = async (userData) => {
    try {
        const user = this.findUserByEmailAddress(userData.Email);
        
        if (user == undefined) {
            console.log("if");
            return null;
        }
        console.log("1 service");

        const salt = await bcrypt.genSalt(10);
        console.log("2 service");

        const hashPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(userData.Password, salt, function (err, hashedPassword) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hashedPassword);
                }
            });
        });

        userData.Password = hashPassword;
        console.log("1");
        const newUser = await UsersModel.create(userData);
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.findUserByEmailAddress = (emailAddress) => {
    console.log("email");

    return UsersModel.findOne({
        where: {
            Email: emailAddress
        }
    });
}

exports.userLogin = async (emailAddress, password) => {
    try {
        const user = await this.findUserByEmailAddress(emailAddress);
        if (!user) {
            return false; // User not found
        }
        const passwordMatch = await bcrypt.compare(password, user.Password);
        return passwordMatch;
    } catch (error) {
        throw error;
    }
}

exports.updateUser = (id, userData) => {
    return UsersModel.update(userData, {
        where: { ID: id }
    });
}

exports.deleteUser = (id) => {
    return UsersModel.destroy({
        where: { ID: id }
    });
}
