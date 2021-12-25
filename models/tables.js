const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

exports.User = sequelize.define("User", {
    //? Model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

exports.Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
  name: {
      type: DataTypes.STRING,
      allowNull: false,

  },

  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
      allowNull: false,
  },
});

exports.Upload = sequelize.define("Image", {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });
