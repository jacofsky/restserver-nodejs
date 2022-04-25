const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, // le digo q va a ser tipo ObjectId
        ref: 'Usuario', // le paso la referencia del schema del usuario
        required: [true, 'El usuario es obligatorio']
    },
    


})


module.exports = model('Categoria', CategoriaSchema)