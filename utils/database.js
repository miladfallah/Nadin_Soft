
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "M4900893714f?" , {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;