const pool = require("../data_base");


const solicitudctr = {};

solicitudctr.getAllsolicitud = async (req, res) => {
    try {
      const response = await pool.query("select  p.idpersona ,p.nombre, concat(p.apepat,' ', p.apemat) as Apellidos,p.dni, p.codigo, e.idestudiante ,e.telefono as telefonoe , e.ubigeo, e.nacionalidad, e.estadocivil,m.idempresa,m.nombree, m.nombrerep,m.gradosup , m.cargorep ,m.areappp , m.telefono,m.fechappp  , m.direccion from empresa m inner join estudiante e  on e.idestudiante  = m.idestudian inner join persona p on p.idpersona = e.idperso  ");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las solicitudes",
        data: response.rows 
      });
    } catch (error) {
      return res.status(400).json({
        status: true,
        resp: "Ok",
        message: error.messages
      });
    }
  };


  module.exports = solicitudctr;