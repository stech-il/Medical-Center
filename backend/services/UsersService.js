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
        console.log(userData);
        const newUser = await UsersModel.create(userData);
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.findUserByEmailAddress = (emailAddress) => {
    return UsersModel.findOne({ Email: emailAddress });
}

exports.userLogin = async (emailAddress, password) => {
    // const user = this.findUserByEmailAddress(emailAddress);
    // bcrypt.compare(password, user.Password, (err, res) => {
    //     if (res === true) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // })
    try {
        const user = await this.findUserByEmailAddress(emailAddress);
        if (!user) {
            return false; // User not found
        }
        console.log("true");
        const passwordMatch = await bcrypt.compare(password, user.Password);
        console.log(passwordMatch);
        if (passwordMatch === true) {
            return true;
        }
        return false;
    } catch (error) {
        throw error; // Handle error appropriately
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
