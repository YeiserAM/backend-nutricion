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


// userCtr.getperfil = async (req, res) => {
//   try {
//     const response = await pool.query("select * from persona");
//     //const response = await pool.query("select concat(apepat,' ',apemat) as Apellidos , codigo , dni from persona ");

//     return res.status(200).json({
//       status: true,
//       resp: "Ok",
//       message: "Se obtuvo los perfiles",
//       data: response.rows
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: true,
//       resp: "Ok",
//       message: error.message
//     });
//   }
// };

userCtr.getusuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("select id_usuario,nombre , concat(apepat,' ',apemat) as Apellidos, codigo , dni from usuario u inner join persona p on u.idperson = p.idpersona  where id_usuario = $1");

    return res.status(200).json({
      status: true,
      resp: "Ok",
      message: "Se obtuvo datos",
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
    
    const user = await pool.query("select * from usuario where usuario = $1 ", [usuario]);

    const response = await pool.query(
      "select u.id_usuario ,u.usuario,u.password ,r.id_rol ,r.rol, p.idpersona ,nombre , concat(apepat,' ',apemat) as Apellidos, codigo , dni, e.idestudiante, e.telefono,e.genero, e.religion ,e.nacionalidad ,e.fechanacimiento ,e.ubigeo ,e.estadocivil  , m.nombree , m.ruc , m.direccion , m.nombrerep ,m.cargorep ,m.gradosup ,m.telefono ,m.fechappp , m.areappp from usuario u inner join persona p on u.idperson = p.idpersona inner join rol r on r.id_rol = u.id_rol inner join estudiante e on e.idperso = p.idpersona inner join empresa m  on m.idestudian =e.idestudiante   where id_usuario = $1",
      [user.rows[0].id_usuario] 
    );
    console.log(response.rows)
    const sidebarResponse = await pool.query("select * from sidebar where id_rol = $1", [response.rows[0].id_rol]);

    if (response.rows.length != 0) {

      const password2 = response.rows[0].password;

      if (await bcrytp.compare(password, password2)) {

        const usuario = {
          usuario: response.rows[0].username,
          id_rol: response.rows[0].idrol,
          idperson : response.rows[0].idperson
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
          data: response.rows[0],
          sidebar: sidebarResponse.rows,
          token: accessToken,
          refreshToken: refreshTokens
        });
      }
    }

    

    return res.status(400).json({
      status: false,
      resp: "Ocurrio un Error",
      message: "Usuario y contraseña incorrectos",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      resp: "Ok", 
      message: error.message
    });
  }
};

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

userCtr.createUser = async(req, res)=>{

  try {
      const{ nombre , apepat, apemat, codigo , dni,usuario, password, id_rol, idperson } = req.body;
      const result = await pool.query('insert into persona(nombre, apepat,apemat, dni, codigo ) values($1,$2,$3,$4,$5) returning *', [nombre, apepat,apemat, dni, codigo]);
      const password2 = await helpers.encryptPassword(password);
      await pool.query('insert into usuario(usuario, password, id_rol,idperson) values($1,$2,$3,$4)', [usuario, password2, id_rol, result.rows[0].idperson]);
      return res.status(200).json(
          `Usuario ${ usuario } creado correctamente...!`);
  } catch (e) {
      console.log(e);
      return res.status(500).json(' error...!');
  }

}

userCtr.getAcceso = async(req, res)=>{
  try{
      const id = parseInt(req.params.id);
      const resp = await pool.query('select * from accesos where id_rol =$1',[id]);
      return res.status(200).json(resp.rows);
  }catch(e){
      console.log(e);
      return res.status(500).json('Internal Server error...!');
  }
}



module.exports = userCtr;
