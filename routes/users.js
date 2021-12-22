const { Router } = require("express");

const userController = require("../controllers/userController");

const router = new Router();

router.get("/", userController.getAccounts);

//  @desc   Login Handle
//  @route  POST /users/login
router.post("/login", userController.handleLogin);

//  @desc   Handle Forget Password
//  @route  POST /users/forget-password
router.post("/forget-password", userController.handleForgetPassword);

//  @desc   Handle reset Password
//  @route  POST /users/reset-password/:token
router.post("/reset-password/:token", userController.handleResetPassword);

//  @desc   Register Handle
//  @route  POST /users/register
router.post("/register", userController.createUser);

// @desc   Edit User 
// @route   POST /users/edit-user
router.post("/edit-user/:id", userController.editUser);

// @desc   Delete User 
// @route   POST /users/delete-user
router.post("/delete-user", userController.deleteUser);

module.exports = router;
