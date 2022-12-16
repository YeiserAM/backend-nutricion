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
  



module.exports = rolctr;
