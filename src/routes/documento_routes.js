const express = require('express');
const documentoctr = require('../controllers/documento_controller');
const router = express.Router();

const pool = require('../data_base');



router.post('/create-documento', documentoctr.createdocumento);
//router.get('/empresa', empresactr.getAllempresa);
//router.get('/', empresactr.getAllempresas);


module.exports =  router;