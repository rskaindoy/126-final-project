const {Router} = require('express');
const router = Router();

const db = require('../config/db'); // db connect
const userController = require('../../controllers/userController');

router.post('/signup', userController.signup); 
router.post('/login', userController.login); 



module.exports = router