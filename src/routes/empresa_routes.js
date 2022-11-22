const express = require('express');
const empresactr = require('../controllers/empresa_controller');
const router = express.Router();

const pool = require('../data_base');



router.post('/create-empresa', empresactr.createempresa);
//router.get('/empresa', empresactr.getAllempresa);
router.get('/', empresactr.getAllempresas);


module.exports =  router;