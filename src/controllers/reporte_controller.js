const pool = require("../data_base");


const reportectr = {};



reportectr.createreporte= async(req, res)=>{

    try {
        const{ titulo, tipo, descripcion,idestudi,idrol,iddoc} = req.body;
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into reporte(titulo, tipo, descripcion,idestudi,idrol,iddoc) values($1,$2,$3,$4,$5,$6)', [titulo, tipo, descripcion,idestudi,idrol,iddoc]);
        return res.status(200).json(
            ` creado correctamente..!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }

  reportectr.getAllreporte= async (req, res) => {
    try {
      const response = await pool.query("select pe.nombre, concat(pe.apepat,' ',pe.apemat )as Apellidos, pe.codigo, pe.dni, es.telefono ,es.nacionalidad, es.religion , de.url,de.idestud,de.idtipo from estudiante es inner join persona pe on es.idperso = pe.idpersona inner join documento de on de.idestud = es.idestudiante");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo los reportes",
        data: response.rows
      });
    } catch (error) {
      return res.status(400).json({
        status: true,
        resp: "Ok",
        message: error.message
      });
    }
  };


  module.exports = reportectr;