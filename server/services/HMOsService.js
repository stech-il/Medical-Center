const HMOsModel = require('../models/HMOsModel');

exports.findHMOById = (id) => {
    return HMOsModel.findByPk(id);
}
