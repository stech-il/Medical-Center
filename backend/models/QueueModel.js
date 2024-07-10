const { DataTypes } = require('sequelize');
const db = require('../database/db.js');
const PatientModel = require('./PatientModel');
const RoomModel = require('./RoomModel');

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
<<<<<<< HEAD
        },
    },
    PariortyNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
}}, {
=======
        }
    },
    PriorityNumber: {

        type: DataTypes.INTEGER,
        allowNull: false,
    }},{
>>>>>>> 7b72f72e7bdcfc4fc42e5f4dbbcd9f8a38144a0b
    tableName: 'Queues',
    timestamps: false
});

module.exports = QueueModel;
