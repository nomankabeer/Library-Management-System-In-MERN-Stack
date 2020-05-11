const express = require ('express');
const router = express.Router();
const UserModel = require('../models/User');

const AuthValidation = require('../request_validation/Auth')
const AuthController = require('../controllers/AuthController')


router.post('/register', AuthValidation.UserExist , AuthController.UserRegister)
router.post('/login', AuthController.UserLogin)

var passport = require('passport');
router.post('/user' , [passport.authenticate('jwt', {session: false}) ] , AuthController.GetUser)
router.post('/user/update' , [passport.authenticate('jwt', {session: false}) ] , AuthController.updateUser)

module.exports = router;