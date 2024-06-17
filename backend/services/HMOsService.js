const HMOModel = require('../models/HMOModel');

exports.findHMOById = (id) => {
    return HMOModel.findByPk(id);
}
