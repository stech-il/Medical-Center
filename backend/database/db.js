const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const db = new Sequelize("medical_center", "root", "Tg1221122!", {
=======
const db = new Sequelize("medical_center", "root", "AAA", {

>>>>>>> e75c9fb4d3c8cf8bc79f869ef989ad98bebc5d5a
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = db;
