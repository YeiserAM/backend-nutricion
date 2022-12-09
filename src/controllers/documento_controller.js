const pool = require("../data_base");


const documentoctr = {};

documentoctr.createdocumento = async(req, res)=>{

    try {
        const{ url, idestud } = req.body;

        //console.log(req.body)
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into documento( url, idestud ) values($1,$2)', [url, idestud ]);
        return res.status(200).json(
            ` documento creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }

  
  module.exports = documentoctr;