const express = require('express');
const router = express.Router();
const reportectr = require('../controllers/reporte_controller');
const pool = require('../data_base');



router.post('/create-reporte', reportectr.createreporte);
router.get('/reportes', reportectr.getAllreporte);
router.get('/reports-all', reportectr.getReportMensual);
router.get('/reports-mensuales', reportectr.allsolicitudes);



module.exports =  router;