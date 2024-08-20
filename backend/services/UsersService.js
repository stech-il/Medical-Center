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
        const user = await this.findUserByEmailAddress(userData.Email);

        if (user) {
            return null;
        }

        const salt = await bcrypt.genSalt(10);

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
        const newUser = await UsersModel.create(userData);
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.findUserByEmailAddress = async (emailAddress) => {
    return UsersModel.findOne({
        where: {
            Email: emailAddress
        }
    });
}

exports.userLogin = async (emailAddress, password) => {
    try {
        const user = await this.findUserByEmailAddress(emailAddress);
        console.log(user);
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.dataValues.Password);
            console.log(password,"\n",user.dataValues.Password);
            console.log(passwordMatch);
            if (passwordMatch) {
                return user;
            }
            return null;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

exports.updateUser = async (id, userData) => {
    // update password
        const salt = await bcrypt.genSalt(10);

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
    
    return UsersModel.update(userData, {
        where: { ID: id }
    });
}

exports.deleteUser = (id) => {
    return UsersModel.destroy({
        where: { ID: id }
    });
}
