const pool = require("../data_base");


const empresactr = {};

empresactr.getAllempresas = async (req, res) => {
    try {
      const response = await pool.query("select * from empresa");
  
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

  empresactr.createempresa = async(req, res)=>{

    try {
        const{ nombree, direccion, nombrerep, cargorep, gradosup, telefono, fechappp,areappp,idestudian } = req.body;
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into empresa(nombree, direccion, nombrerep, cargorep, gradosup, telefono, fechappp,areappp,idestudian) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [nombree, ruc, direccion, nombrerep, cargorep, gradosup, telefono, fechappp,areappp,idestudian]);
        return res.status(200).json(
            ` empresa ${ nombree }  creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error....!');
    }
  
  }



  module.exports = empresactr;