const { Sequelize } = require('sequelize');

const db = new Sequelize("medical_center", "root", "Tg12211221!!", 
{
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = db;
