const { Sequelize } = require('sequelize');

const db = new Sequelize("medical_center", "root", "AAA", {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = db;
