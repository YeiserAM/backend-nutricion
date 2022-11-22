const pool = require("../data_base");


const personactr = {};

personactr.getAllpersonas = async (req, res) => {
    try {
      const response = await pool.query("select * from persona");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las personas",
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

personactr.createpersona = async(req, res)=>{

    try {
        const{ idpersona,nombre, apepat, apemat, codigo,dni } = req.body;
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into persona(idpersona,nombre, apepat, apemat, codigo,dni ) values($1,$2,$3,$4,$5,$6)', [idpersona,nombre, apepat, apemat, codigo,dni]);
        return res.status(200).json(
            `nombre ${ nombre } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }

  module.exports = personactr;