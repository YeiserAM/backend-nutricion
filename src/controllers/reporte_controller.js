const pool = require("../data_base");


const reportectr = {};



reportectr.createreporte= async(req, res)=>{

    try {
        const{ ttitulo, tipo, descripcion,iddocumento,idestudiante} = req.body;
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into reporte(titulo, tipo, descripcion,iddocumento,idestudiante) values($1,$2,$3,$4,$5)', [titulo, tipo, descripcion,iddocumento,idestudiante]);
        return res.status(200).json(
            ` creado correctamente..!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }


  module.exports = reportectr;