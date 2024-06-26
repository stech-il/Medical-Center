const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const db = new Sequelize("medical_center", "root", "MySQLDatabase*(89", {
=======
const db = new Sequelize("medica_center", "root", "ShoshiMysql23", {
>>>>>>> 448e02c1cc37c9676a80ac1aa668b1102789bcf0

    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = db;
