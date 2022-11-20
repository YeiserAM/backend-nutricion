const express = require('express');

const router = express.Router();

const authCtr = require('../controllers/user_controller');

router.get('/', authCtr.getAllUsers);

router.post('/login', authCtr.singin);

module.exports =  router;