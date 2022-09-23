const express = require("express");

const app = express();

/**
 * importación de rutas
 */
const tipoEquipo = require('./routes/tipoEquipo')
const estado = require('./routes/estado')
const marca = require("./routes/marca")
const usuario = require('./routes/usuario')

 // TODO: middleware para urlencoded
 app.use(express.json())
 // TODO: middleware de subida de foto
 // TODO: middleware de cors
 
 app.use('/api/tipoequipos', tipoEquipo)
 app.use('/api/estados', estado)
 app.use('/api/usuarios', usuario)
 app.use('/api/marca', marca)

module.exports= app;

