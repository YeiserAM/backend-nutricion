const express = require('express')
const morgan = require('morgan')

const usersRoutes = require('./src/routes/user_routes')
const personaRoutes = require('./src/routes/persona_routes')
const estudianteRoutes = require('./src/routes/estudiante_routes')

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



app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

module.exports = app;