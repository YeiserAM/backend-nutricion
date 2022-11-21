const express = require('express');
const router = express.Router();
const authCtr = require('../controllers/user_controller');
const pool = require('../data_base');

router.get('/', authCtr.getAllUsers);

router.post('/login', authCtr.singin);

router.post('/test', authCtr.autentication);

router.post('/create-users', authCtr.createUser);

module.exports =  router;