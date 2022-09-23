const { Schema, model } = require("mongoose");

const tipoequipoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Nombre equipo requerido']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion:{
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    }
})

module.exports = model('TipoEquipo', tipoequipoSchema)