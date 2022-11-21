const pool = require("../data_base");

const jwt = require('jsonwebtoken');
const bcrytp = require('bcryptjs');

const userCtr = {};

userCtr.getAllUsers = async (req, res) => {
  try {
    const response = await pool.query("select * from usuario");

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

    const response = await pool.query(
      "select * from usuario where usuario = $1",
      [usuario]
    );

    if (response.rows.length != 0) {
      const password2 = response.rows[0].password;
      console.log(password2)
    }

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

userCtr.autentication = verifyToken, (req,res) => {
  res.json('Informacion secreta');
}

function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
      const content = jwt.verify(token,'stil');
      req.data = content;
      next();
    }else{
      res.status(401).json('Token vacio');
    }
}  

module.exports = userCtr;
