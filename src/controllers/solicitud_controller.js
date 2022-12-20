const pool = require("../data_base");


const solicitudctr = {};


solicitudctr.createSolicitud = async (req, res) => {
  try {
    // formato de frecha de registro       "15-06-2022"
    const { nombreemp, nombreapeliidorep, cargorep, gradorep, direccionemp, telefonoemp, fechappp, areappp, estado_civil, religion, fechanacimiento, ubigeo, fecharegistro,id_usuario } = req.body;
    
    const insetSolicitud = await pool.query('insert into solicitud(nombreemp, nombreapeliidorep, cargorep, gradorep, direccionemp, telefonoemp, fechappp, areappp, estado_civil, religion, fechanacimiento, ubigeo, fecharegistro, id_usuario , id_estadosolicitud) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning *', [nombreemp, nombreapeliidorep, cargorep, gradorep, direccionemp, telefonoemp, fechappp, areappp, estado_civil, religion, fechanacimiento, ubigeo,fecharegistro, id_usuario,4]);

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

solicitudctr.getAllsolicitudpendiente = async (req, res) => {
    try {
      
      const response = await pool.query("select * from solicitud s inner join usuario u on u.id_usuario = s.id_usuario inner join estudiante e on e.id_estudiante = u.id_estudiante inner join persona p on p.id_persona = e.id_persona where id_estadosolicitud = 4");

      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las solicitudes",
        data: response.rows,
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
      const response = await pool.query(" select * from solicitud where id_usuario = $1 ", [id]);
      // const responseDocumeto = await pool.query("select * from documento");

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

  solicitudctr.getsolicituddoc = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const response = await pool.query(" select * from solicitud s inner join documento d on d.id_solicitud = s.id_solicitud  where s.id_solicitud  = $1 ", [id]);
      // const responseDocumeto = await pool.query("select * from documento");

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

solicitudctr.getestado = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query(" select * from solicitud s inner join estadosolicitud e on s.id_estadosolicitud = e.id_estadosolicitud where e.id_estadosolicitud = $1 ", [id]);


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

solicitudctr.updatesolicitud = async(req, res)=>{
  try{
      const id = parseInt(req.params.id);
      await pool.query(' update solicitud set id_estadosolicitud = 1 where id_solicitud = $1', [id]);
      return res.status(200).json(`Sesion Finalizado exitosamente...!`)
  }catch (e){
      console.log(e);
      return res.status(500).json('Internal Server error...!');
  }
}




  module.exports = solicitudctr;