const { DataTypes } = require("sequelize");

// const { schema } = require("./secure/userValidation");
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

// User.validate = (schema) => async (req, res, next) => {
//     try {
//       await schema.validate({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         password: req.body.password,
//       });
//       return next();
//     } catch (err) {
//       return res.status(500).json({ type: err.name, message: err.message });
//     }
//   };

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
