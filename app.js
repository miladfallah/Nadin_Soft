const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const express = require("express");

const connectDB = require("./config/db");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database connection
connectDB();


const app = express();

//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* Routes
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(
        `Server is running on port ${PORT}`
    )
);