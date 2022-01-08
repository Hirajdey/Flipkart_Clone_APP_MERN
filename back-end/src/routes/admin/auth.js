const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSignupRequist, validateSigninRequist, isRequestValidated } = require('../../validator/auth');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();

router.post('/admin/signup', validateSignupRequist, isRequestValidated, signup)
router.post('/admin/signin', validateSigninRequist, isRequestValidated, signin)
router.post('/admin/signout', signout)

module.exports = router; 

