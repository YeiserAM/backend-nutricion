const pool = require("../data_base");


const estudiantectr = {};

estudiantectr.getAllestudiantes = async (req, res) => {
    try {
      const response = await pool.query("select pe.nombre, concat(pe.apepat,' ',pe.apemat )as Apellidos, pe.codigo, pe.dni, es.telefono ,es.nacionalidad, es.religion from estudiante es inner join persona pe on es.idperso = pe.idpersona");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las estudiantes",
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

  estudiantectr.getAllestudiante = async (req, res) => {
    try {
      const response = await pool.query("select * from estudiante");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo los estudiantes",
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

estudiantectr.createestudiante = async(req, res)=>{

    try {
        const{ telefono, genero, religion, nacionalidad,fechanacimiento,ubigeo,estadocivil,idperso } = req.body;
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into estudiante(telefono, genero, religion, nacionalidad,fechanacimiento,ubigeo,estadocivil,idperso) values($1,$2,$3,$4,$5,$6,$7,$8)', [telefono, genero, religion, nacionalidad,fechanacimiento,ubigeo,estadocivil,idperso]);
        return res.status(200).json(
            ` creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }

  module.exports = estudiantectr;