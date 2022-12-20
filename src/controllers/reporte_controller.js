const pool = require("../data_base");

const reportectr = {};

reportectr.getReportMensual = async (req, res) => {
	try {
		const responseReport = await pool.query("select * from solicitud");

		const responseReportAceptado = await pool.query(
			"select * from solicitud where id_estadosolicitud = $1",
			[1]
		);

		const responseReportPendiente = await pool.query(
			"select * from solicitud where id_estadosolicitud = $1",
			[4]
		);

		const responseReportObservado = await pool.query(
			"select * from solicitud where id_estadosolicitud = $1",
			[3]
		);

		const responseReportRechazado = await pool.query(
			"select * from solicitud where id_estadosolicitud = $1",
			[2]
		);

		const reports = {
			solicitudesTotals: responseReport.rows.length,
			solicitudesPendientes: responseReportPendiente.rows.length,
			solicitudesAceptado: responseReportAceptado.rows.length,
			solicitudesObservado: responseReportObservado.rows.length,
			solicitudesRechazado: responseReportRechazado.rows.length,
		};

		return res.status(200).json({
			status: true,
			resp: "Ok",
			message: "Se obtuvo los reportes",
			data: reports,
		});
	} catch (error) {
		return res.status(400).json({
			status: false,
			resp: "Oh no",
			menssage: error,
		});
	}
};

reportectr.getAllreporte = async (req, res) => {
	try {
		const response = await pool.query(
			"select pe.nombre, concat(pe.apepat,' ',pe.apemat )as Apellidos, pe.codigo, pe.dni, es.telefono ,es.nacionalidad, es.religion , de.url,de.idestud,de.idtipo from estudiante es inner join persona pe on es.idperso = pe.idpersona inner join documento de on de.idestud = es.idestudiante"
		);

		return res.status(200).json({
			status: true,
			resp: "Ok",
			message: "Se obtuvo los reportes",
			data: response.rows,
		});
	} catch (error) {
		return res.status(400).json({
			status: true,
			resp: "Ok",
			message: error.message,
		});
	}
};

// reportectr.getAllreportes = async (req, res) => {
// 	try {
// 		const response = await pool.query(
// 			"select pe.nombre, concat(pe.apepat,' ',pe.apemat )as Apellidos, pe.codigo, de.url,de.idestud,de.idtipo, re.idreporte ,re.titulo ,re.tipo ,re.descripcion from estudiante es inner join persona pe on es.idperso = pe.idpersona inner join documento de on de.idestud = es.idestudiante inner join reporte re on re.idestudi = es.idestudiante "
// 		);

// 		return res.status(200).json({
// 			status: true,
// 			resp: "Ok",
// 			message: "Se obtuvo los reportes",
// 			data: response.rows,
// 		});
// 	} catch (error) {
// 		return res.status(400).json({
// 			status: true,
// 			resp: "Ok",
// 			message: error.message,
// 		});
// 	}
// };

reportectr.createreporte = async(req, res)=>{

    try {
        const{ titulo, tipo, descripcion , id_documentorep , url} = req.body;
		const insertdoc = await pool.query('insert into documentorep(url) values($1) returning *', [url]);
        //const password2 = await helpers.encryptPassword(password);
        await pool.query('insert into reporte(titulo, tipo, descripcion , id_documentorep  ) values($1,$2,$3,$4)', [titulo, tipo, descripcion , insertdoc.rows[0].id_documentorep]);
        return res.status(200).json(
            ` creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json(' error...!');
    }
  
  }

  
module.exports = reportectr;
