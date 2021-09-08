const express = require('express');
const { signup, signin } = require('../../controller/admin/auth');
const { validateSignupRequist, validateSigninRequist, isRequestValidated } = require('../../validator/auth');
const router = express.Router();

router.post('/admin/signup', validateSignupRequist, isRequestValidated, signup)
router.post('/admin/signin', validateSigninRequist, isRequestValidated, signin)


module.exports = router; 
