const express = require('express')
const morgan = require('morgan')

const usersRoutes = require('./src/routes/user_routes')
const personaRoutes = require('./src/routes/persona_routes')
const estudianteRoutes = require('./src/routes/estudiante_routes')
const empresaRoutes = require('./src/routes/empresa_routes')
const solicitudRoutes = require('./src/routes/solicitud_routes')
const documentoRoutes = require('./src/routes/documento_routes')
const reporteRoutes = require('./src/routes/reporte_routes')


require("dotenv").config();
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.get('/', function(req, res, next) {
    res.send('Backend Nutricion Funciona Correctamente...!');
});


app.use('/api/users', usersRoutes);
app.use('/api/persona', personaRoutes);
app.use('/api/estudiante', estudianteRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/solicitud', solicitudRoutes);
app.use('/api/documento', documentoRoutes);
app.use('/api/reporte', reporteRoutes);

const port =process.env.PORT || 3000;
app.set('port', port);

// app.listen(3000, '192.168.0.100' || 'localhost', function(){
//   console.log(`Server running on port ${process.env.PORT}`)
// })

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
); 


module.exports = app;