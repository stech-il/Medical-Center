const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const db = new Sequelize("medical_center", "root", "MySQLDatabase*(89", 
=======
const db = new Sequelize("medica_center", "root", "ShoshiMysql23", 
>>>>>>> 0af370f92995b3acb8fde7551dd7c3223d57c1b1
{
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = db;
