const pool = require("../data_base");


const rolctr = {};


rolctr.getAllroles = async (req, res) => {
    try {
      const response = await pool.query("select * from rol");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo los usuarios",
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


  rolctr.getestudiantes= async (req, res) => {
    try {
      const response = await pool.query("select p.nombre , p.apepat ,p.apemat , u.id_usuario from usuario u inner join estudiante e on u.id_estudiante = e.id_estudiante inner join persona p on p.id_persona = e.id_persona where u.id_rol = 2");
  
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
  
  



module.exports = rolctr;
