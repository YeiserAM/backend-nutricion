const express = require('express');
const estudiantectr = require('../controllers/estudiante_controller');
const router = express.Router();

const pool = require('../data_base');



router.post('/create-estudiante', estudiantectr.createestudiante);
router.get('/estudiante', estudiantectr.getAllestudiante);
router.get('/', estudiantectr.getAllestudiantes);


module.exports =  router;