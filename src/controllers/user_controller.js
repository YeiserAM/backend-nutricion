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
    const response = await pool.query("select id_usuario,  nombre , concat(apepat,' ',apemat) as Apellidos, codigo , dni from usuario u inner join persona p on u.idperson = p.idpersona where id_usuario = $1");

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
      "select u.id_usuario ,u.usuario,u.password ,r.id_rol ,r.rol, p.idpersona ,nombre , concat(apepat,' ',apemat) as Apellidos, codigo , dni, e.idestudiante, e.telefono,e.genero, e.religion ,e.nacionalidad ,e.fechanacimiento ,e.ubigeo ,e.estadocivil from usuario u inner join persona p on u.idperson = p.idpersona inner join rol r on r.id_rol = u.id_rol inner join estudiante e on e.idperso = p.idpersona where id_usuario = $1",
      [user.rows[0].id_usuario] 
    );
    console.log(response.rows)
    const sidebarResponse = await pool.query("select * from sidebar where id_rol = $1", [response.rows[0].id_rol]);

    if (response.rows.length != 0) {

      const password2 = response.rows[0].password;

      if (await bcrytp.compare(password, password2)) {

        const accessToken = jwt.sign({ id_usuario:response.rows[0].id_usuario, usuario: response.rows[0].username}, secret, {
          expiresIn: "7200s"
        });

        const usuario = {
          id_usuario: response.rows[0].id_usuario,
          usuario: response.rows[0].username,
          id_rol: response.rows[0].idrol,
          idperson : response.rows[0].idperson,
          image:  response.rows[0].image,
          session_token: `JWT ${accessToken}`
        };

  

        const refreshToken = jwt.sign({ usuario }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        return res.status(200).json({
          success: true,
          statusw: true,
          resp: "Ok",
          message: "Se inicio Session",
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
userCtr.updateuser = async(req, res) => {
  try {
      const id = parseInt(req.params.id);
      const { nombre , apepat, apemat, codigo , dni,usuario, password, id_rol, idperson , idpersona } = req.body;
      const password2 = await helpers.encryptPassword(password);
      const result = await pool.query('update usuario set usuario=$1, password=$2   where id_usuario=$3  returning *', [usuario, password2  ,id]);
      //console.log(result.rows[0].idperson);
      const result2 = await pool.query('update persona set nombre=$1 , apepat=$2 , apemat=$3 , codigo=$4, dni=$5  where idpersona=$6 ', [nombre , apepat, apemat, codigo ,dni , result.rows[0].idperson]);
      //console.log(result2.rows[0]);
      return res.status(200).json(`Usuario ${ id } se ha actualizado correctamente...!`);
  } catch (e) {
      console.log(e)
      return res.status(500).json('Internal Server error...!');
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
