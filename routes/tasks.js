const { Router } = require("express");

const adminController = require("../controllers/adminController");

const router = new Router();

//  @ desc  Show Tasks
//  @ route  GET /tasks/
router.get("/", adminController.getTasks);

//  @ desc  Create Tasks
//  @ route  POST /tasks/creare-task
router.post("/create-task", adminController.createTask);

//  @ desc  Edit Tasks
//  @ route  POST tasks/edit-task/:id
router.post("/edit-task/:id", adminController.editTask);

// @desc   Delete Task
// @route   POST /tasks/delete-task
router.post("/delete-task", adminController.deleteTask);

module.exports = router;