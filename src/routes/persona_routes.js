const express = require('express');
const router = express.Router();
const personactr = require('../controllers/persona_controller');
const pool = require('../data_base');



router.post('/create-persona', personactr.createpersona);
router.get('/', personactr.getAllpersonas);


module.exports =  router;