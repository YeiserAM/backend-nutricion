const express = require('express');
const router = express.Router();
const solicitudctr = require('../controllers/solicitud_controller');
const pool = require('../data_base');




router.get('/solicitudpendiente', solicitudctr.getAllsolicitudpendiente);
router.get('/solicituddoc/:id', solicitudctr.getsolicituddoc)
router.get('/estado/:id', solicitudctr.getestado);
router.delete('/delete/:id', solicitudctr.eliminarSolicitud);
router.get('/solicitudes/:id', solicitudctr.getAllsolicitudid);
router.post('/create-solicitud', solicitudctr.createSolicitud);
router.put('/update/:id', solicitudctr.updatesolicitud);


module.exports =  router;