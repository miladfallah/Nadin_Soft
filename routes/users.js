const { Router } = require("express");

const userController = require("../controllers/userController");

const { authenticated } = require('../middlewares/auth');

const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');

const router = new Router();

router.get("/", userController.getAccounts);

//  @desc   Login Handle
//  @route  POST /users/login
router.post("/login", loginSchema, userController.handleLogin);

//  @desc   Handle Forget Password
//  @route  POST /users/forget-password
router.post("/forget-password", userController.handleForgetPassword);

//  @desc   Handle reset Password
//  @route  POST /users/reset-password/:token
router.post("/reset-password/:token", userController.handleResetPassword);

//  @desc   Register Handle
//  @route  POST /users/register
router.post("/register", registerSchema, userController.createUser);

// @desc   Edit User 
// @route   POST /users/edit-user
router.post("/edit-user/:id", authenticated, userController.editUser);

// @desc   Delete User 
// @route   POST /users/delete-user
router.delete("/delete-user", authenticated, userController.deleteUser);

// @desc   Upload Users Image
// @route   POST /users/upload-image
router.post("/upload-image", authenticated, userController.uploadImage);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
       fullname: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().required(),
        confirmPassword: Joi.ref('password')
    });
    validateRequest(req, next, schema);
}

function loginSchema(req, res, next) {
    const schema = Joi.object({
         email: Joi.string().email(),
         password: Joi.string().required(),
     });
     validateRequest(req, next, schema);
 }

