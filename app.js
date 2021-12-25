const path = require("path");
const dotEnv = require("dotenv");
const express = require("express");
const sequelize = require('./utils/database')
//* Load Config
dotEnv.config({ path: "./config/config.env" });

const app = express();

//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(
    app.listen(PORT, () =>
    console.log(
        `Server is running on port ${PORT}`)
    )
    ).catch((err) => console.log(err));