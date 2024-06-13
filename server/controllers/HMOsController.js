const HMOsService = require('../services/HMOsService');

exports.findHMOById = async (req, res) => {
    try {
        const HMO = await HMOsService.findHMOById(req.params.id);
        if (HMO) {
            return res.json({
                data: HMO,
                message: 'Success.'
            });
        } else {
            return res.status(404).json({
                message: 'HMO not found.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
