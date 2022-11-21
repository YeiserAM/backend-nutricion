const pool = require("../data_base");

const jwt = require("jsonwebtoken");
const bcrytp = require("bcryptjs");
const helpers = require('../libs/helpers');

const secret = "nutricion-upeu-HMDA-access-token";
const refreshTokenSecret = "nutricion-upeu-HMDA-refresh-access-token";

const refreshTokens = []

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

      if (await bcrytp.compare(password, password2)) {

        const usuario = {
          usuario: response.rows[0].username,
          id_rol: response.rows[0].idrol
        };

        const accessToken = jwt.sign({ usuario }, secret, {
          expiresIn: "7200s"
        });

        const refreshToken = jwt.sign({ usuario }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        return res.status(200).json({
          statusw: true,
          resp: "Ok",
          message: "Se inicio",
          data: response.rows,
          token: accessToken,
          refreshToken: refreshTokens
        });
      }
    }

    return res.status(200).json({
      statusw: true,
      resp: "Ok",
      message: "Se inicio",
      data: response.rows
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      resp: "Ok",
      message: error.message
    });
  }
};

userCtr.createUser = async(req, res)=>{

  try {
      const{ usuario, password, id_rol } = req.body;
      const password2 = await helpers.encryptPassword(password);
      await pool.query('insert into usuario(usuario, password, id_rol) values($1,$2,$3)', [usuario, password2, id_rol]);
      return res.status(200).json(
          `Usuario ${ username } creado correctamente...!`);
  } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server error...!');
  }

}

(userCtr.autentication = verifyToken), (req, res) => {
  res.json("Informacion secreta");
};

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json("No autorizado");

  const token = req.headers.authorization.substr(7);
  if (token !== "") {
    const content = jwt.verify(token, "stil");
    req.data = content;
    next();
  } else {
    res.status(401).json("Token vacio");
  }
}

module.exports = userCtr;
