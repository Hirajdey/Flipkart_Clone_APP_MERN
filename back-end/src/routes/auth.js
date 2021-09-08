const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequist, validateSigninRequist, isRequestValidated } = require('../validator/auth');
const router = express.Router();

router.post('/signup', validateSignupRequist, isRequestValidated, signup)
router.post('/signin', validateSigninRequist, isRequestValidated, signin)

// router.post('/profile', requireSignin, (req, res) =>{
//     res.status(200).json({ user: 'profile' })
// })

module.exports = router;
