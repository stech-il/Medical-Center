const { DataTypes } = require('sequelize');
const db = require('../database/db.js');
const RoomModel = require('./RoomModel');
const PatientsModel = require('./PatientsModel');

const QueuesModel = db.define("queues", {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PatientsModel,
            key: 'ID'
        }
      },
      RoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RoomModel,
            key: 'ID'
        }
      },
      PriorityNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }
)

module.exports = QueuesModel;
