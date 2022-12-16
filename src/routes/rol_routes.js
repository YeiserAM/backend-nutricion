const express = require('express');
const router = express.Router();
const rolctr = require('../controllers/rol_controller');
const pool = require('../data_base');



//router.post('/create-rol', rolctr.createrol);
router.get('/roles', rolctr.getAllroles);


module.exports =  router;