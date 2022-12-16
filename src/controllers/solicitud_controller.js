const pool = require("../data_base");


const solicitudctr = {};


solicitudctr.createSolicitud = async (req, res) => {
  try {
    const { nombreemp, nombreapeliidorep, cargorep, gradorep, direccionemp, telefonoemp, fechappp, areappp, estado_civil, religion, fechanacimiento, ubigeo, id_usuario } = req.body;
    
    const insetSolicitud = await pool.query('insert into solicitud(nombreemp, nombreapeliidorep, cargorep, gradorep, direccionemp, telefonoemp, fechappp, areappp, estado_civil, religion, fechanacimiento, ubigeo, id_usuario) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning *', [nombreemp, nombreapeliidorep, cargorep, gradorep, direccionemp, telefonoemp, fechappp, areappp, estado_civil, religion, fechanacimiento, ubigeo, id_usuario]);

    return res.status(200).json({
      status: true,
      resp: 'Ok',
      messages: 'Se creo la solicitud exitosamente',
      data: insetSolicitud.rows[0]
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      resp: 'Oh no',
      message: error.message
    })
  }
}

solicitudctr.getAllsolicitud = async (req, res) => {
    try {
      
      const response = await pool.query("select  p.idpersona ,p.nombre, concat(p.apepat,' ', p.apemat) as Apellidos,p.dni, p.codigo, e.idestudiante ,e.telefono as telefonoe , e.ubigeo, e.nacionalidad, e.estadocivil,m.idempresa,m.nombree, m.nombrerep,m.gradosup , m.cargorep ,m.areappp , m.telefono,m.fechappp  , m.direccion from empresa m inner join estudiante e  on e.idestudiante  = m.idestudian inner join persona p on p.idpersona = e.idperso ");

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

  solicitudctr.getAllsolicitudid = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const response = await pool.query("select  p.idpersona ,p.nombre, concat(p.apepat,' ', p.apemat) as Apellidos,p.dni, p.codigo, e.idestudiante ,e.telefono as telefonoe , e.ubigeo, e.nacionalidad, e.estadocivil,m.idempresa,m.nombree, m.nombrerep,m.gradosup , m.cargorep ,m.areappp , m.telefono,m.fechappp  , m.direccion from empresa m inner join estudiante e  on e.idestudiante  = m.idestudian inner join persona p on p.idpersona = e.idperso where e.idestudiante = $1 ", [id]);
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
      await pool.query('delete from estudiante where idestudiante=$1', [id]);

      return res.status(200).json(` ${ id } eliminado correctamente...!`);
  } catch (e) {
      console.log(e)
      return res.status(500).json('Internal Server error...!');
  }
}


  module.exports = solicitudctr;