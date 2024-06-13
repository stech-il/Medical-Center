import {Sequelize} from "sequelize"

const db = new Sequelize("medica_center", "root", "ShoshiMysql23", {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

export default db;
