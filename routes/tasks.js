const { Router } = require("express");

const adminController = require("../controllers/adminController");
const { authenticated } = require("../middlewares/auth");

const router = new Router();

//  @ desc  Show Tasks
//  @ route  GET /tasks/
router.get("/", authenticated, adminController.getTasks);

//  @ desc  Create Tasks
//  @ route  POST /tasks/creare-task
router.post("/create-task", authenticated, adminController.createTask);

//  @ desc  Edit Tasks
//  @ route  POST tasks/edit-task/:id
router.post("/edit-task/:id", authenticated, adminController.editTask);

// @desc   Delete Task
// @route   POST /tasks/delete-task
router.delete("/delete-task", authenticated, adminController.deleteTask);

// @desc   Upload Image
// @route   POST /tasks/upload-image
router.post("/upload-image", authenticated, adminController.uploadImage);

module.exports = router;