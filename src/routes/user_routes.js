const express = require('express');
const router = express.Router();
const authCtr = require('../controllers/user_controller');
const pool = require('../data_base');

router.get('/', authCtr.getAllUsers);

router.get('/:id', authCtr.getusuario);

// router.get('/perfil', authCtr.getperfil);

router.post('/login', authCtr.singin);

router.post('/test', authCtr.autentication);

router.post('/create-users', authCtr.createUser);

router.get('/accesos/:id', authCtr.getAcceso);

router.put('/updateuser/:id', authCtr.updateuser);


module.exports =  router;