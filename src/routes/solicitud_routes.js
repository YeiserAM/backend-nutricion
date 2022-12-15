const express = require('express');
const router = express.Router();
const solicitudctr = require('../controllers/solicitud_controller');
const pool = require('../data_base');



//router.post('/create-solicitud', solicitudctr.createsolicitud);
router.get('/solicitudes', solicitudctr.getAllsolicitud);
router.delete('/delete/:id', solicitudctr.eliminarSolicitud);
router.get('/solicitudes/:id', solicitudctr.getAllsolicitudid);


module.exports =  router;