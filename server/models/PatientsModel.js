const { DataTypes } = require('sequelize');
const db = require('../database/db.js');

const PatientsModel = db.define("patients", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    HMOid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'HMOsModel',
            key: 'ID'
        }
    },
    CheckIn: {
        type: DataTypes.DATE,
        allowNull: true
    },
    CheckOut: {
        type: DataTypes.DATE,
        allowNull: true,  // Allow null values
        defaultValue: null  // Set default value to null if not provided
    },
    
    UniqeNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'Patients',
    timestamps: false
});

module.exports = PatientsModel;
