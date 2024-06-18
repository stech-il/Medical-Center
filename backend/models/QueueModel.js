const { DataTypes } = require('sequelize');
const db = require('../database/db.js');
const RoomModel = require('./RoomModel');
const PatientModel = require('./PatientModel');

const QueueModel = db.define("queues", {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PatientModel,
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
      PariortyNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }
)

module.exports = QueueModel;
