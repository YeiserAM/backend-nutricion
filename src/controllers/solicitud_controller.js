const pool = require("../data_base");


const solicitudctr = {};

solicitudctr.getAllsolicitud = async (req, res) => {
    try {
      const response = await pool.query("select p.nombre, concat(p.apepat,' ', p.apemat) as Apellidos,p.dni, p.codigo,e.telefono , e.ubigeo, e.nacionalidad, e.estadocivil, m.nombrerep,m.gradosup , m.cargorep ,m.areappp , m.telefono , m.direccion from empresa m inner join estudiante e  on e.idestudiante  = m.idestudian inner join persona p on p.idpersona = e.idperso  ");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las empresas",
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