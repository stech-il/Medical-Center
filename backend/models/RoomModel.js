const { DataTypes } = require('sequelize');
const db = require('../database/db.js');
const RoomModel = require('./RoomModel');

const RoomModel = db.define("users", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RoomID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RoomsModel,
            key: 'ID'
        }
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Rooms',
    timestamps: false
});

module.exports = RoomModel;