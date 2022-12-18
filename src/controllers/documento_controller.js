const pool = require("../data_base");


const documentoctr = {};

documentoctr.createdocumento = async(req, res)=>{

    try {
        const{ url, id_solicitud } = req.body;
        
        const insertDocument = await pool.query('insert into documento( url, id_solicitud ) values($1,$2) returning *', [url, id_solicitud]);

        return res.status(200).json({
          stauts: true,
          resp: 'Ok',
          messages: 'Se genero el documento exitosamente',
          data: insertDocument.rows[0]
        });
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