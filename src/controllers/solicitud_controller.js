const pool = require("../data_base");


const solicitudctr = {};

// solicitudctr.getAllsolicitud = async (req, res) => {
//     try {
      
//       const response = await pool.query("select  p.idpersona ,p.nombre, concat(p.apepat,' ', p.apemat) as Apellidos,p.dni, p.codigo, e.idestudiante ,e.telefono as telefonoe , e.ubigeo, e.nacionalidad, e.estadocivil,m.idempresa,m.nombree, m.nombrerep,m.gradosup , m.cargorep ,m.areappp , m.telefono,m.fechappp  , m.direccion from empresa m inner join estudiante e  on e.idestudiante  = m.idestudian inner join persona p on p.idpersona = e.idperso ");

//       const responseDocumeto = await pool.query("select * from documento");

//       return res.status(200).json({
//         status: true,
//         resp: "Ok",
//         message: "Se obtuvo las solicitudes",
//         data: response.rows,
//         documents: responseDocumeto.rows
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: true,
//         resp: "Ok",
//         message: error.messages
//       });
//     }
//   };

  solicitudctr.getAllsolicitudid = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const response = await pool.query(" select * from solicitud where id_usuario = $1 ", [id]);
      const responseDocumeto = await pool.query("select * from documento");

      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las solicitudes",
        data: response.rows,
        documents: responseDocumeto.rows
      });
    } catch (error) {
      return res.status(400).json({
        status: true,
        resp: "Ok",
        message: error.messages
      });
    }
  };


solicitudctr.eliminarSolicitud = async(req, res) => {
  try {
      const id = parseInt(req.params.id);
      console.log(id)
      await pool.query('delete from solicitud where id_solicitud=$1', [id]);

      return res.status(200).json(` ${ id } eliminado correctamente...!`);
  } catch (e) {
      console.log(e)
      return res.status(500).json('Internal Server error...!');
  }
}


  module.exports = solicitudctr;