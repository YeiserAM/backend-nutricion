const express = require('express');
const correoctr = require('../controllers/correo_controller');
const router = express.Router();

const pool = require('../data_base');


router.post('/correo', correoctr.enviocorreo);


module.exports =  router;