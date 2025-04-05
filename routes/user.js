const express = require('express');
const {handleUserSignup, handleUserLogIn, handleUserLogOut} = require('../controllers/user');
const router = express.Router();



router.post('/', handleUserSignup);
router.post('/login', handleUserLogIn);
router.get('/logout', handleUserLogOut);


module.exports = router;