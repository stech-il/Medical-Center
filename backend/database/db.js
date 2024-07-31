const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const db = new Sequelize("medical_center", "root", "MySQLDatabase*(89", 
=======
const db = new Sequelize("medical_center", "root", "Tg12211221!!", 
>>>>>>> 2a5cd060609245a63297acca841029ec51d6a009
{
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = db;
