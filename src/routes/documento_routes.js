const express = require('express');
const documentoctr = require('../controllers/documento_controller');
const router = express.Router();

const pool = require('../data_base');



router.post('/create-documento', documentoctr.createdocumento);
router.get('/tipo', documentoctr.getAlltipo);
router.get('/documento', documentoctr.getAlldoc);


module.exports =  router;