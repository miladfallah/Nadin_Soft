const { Router } = require("express");

const adminController = require("../controllers/adminController");

const router = new Router();

router.post("/create-task", adminController.createTask);

router.post("/edit-task/:id", adminController.editTask);

module.exports = router;