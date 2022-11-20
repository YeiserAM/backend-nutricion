const pool = require("../data_base");

const userCtr = {};

userCtr.getAllUsers = async (req, res) => {
  try {
    const response = await pool.query("select *from usuario");

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
userCtr.singin = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    console.log(usuario + " " + password)
    const response = await pool.query(
      "select *from usuario where usuario = $1",
      [usuario]
    );
    console.log(response.rows);
    console.log(response);
    return  res.status(200).json({
      statusw: true,
      resp: 'Ok',
      message: 'Se inicio',
      data: response.rows
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      resp: "Ok",
      message: error.message
    });
  }
};

module.exports = userCtr;
