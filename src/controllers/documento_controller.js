const pool = require("../data_base");


const documentoctr = {};

documentoctr.createdocumento = async(req, res)=>{

    try {
        const{ url, idestud ,idtipo} = req.body;

        //console.log(req.body)
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into documento( url, idestud , idtipo ) values($1,$2,$3)', [url, idestud , idtipo]);
        return res.status(200).json(
            ` documento creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }

  documentoctr.getAlltipo = async (req, res) => {
    try {
      const response = await pool.query("select * from tipodoc");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo las tipos",
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

  documentoctr.getAlldoc = async (req, res) => {
    try {
      const response = await pool.query("select * from documento");
  
      return res.status(200).json({
        status: true,
        resp: "Ok",
        message: "Se obtuvo los documentos",
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

  
  module.exports = documentoctr;