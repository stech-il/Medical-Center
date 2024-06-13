const { DataTypes } = require('sequelize');
const db = require('../database/db.js');

const HMOsModel = require('./HMOsModel'); // Ensure the correct path

const PatientsModel = db.define("patients", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false // Change to false if it should be required
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false // Change to false if it should be required
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false // Change to false if it should be required
    },
    HMOid: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure this is not nullable if it's a required foreign key
        references: {
            model: HMOsModel,
            key: 'ID'
        }
    },
    CheckIn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    CheckOut: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    UniqeNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Patients',
    timestamps: false
});

module.exports = PatientsModel;
