const {Schema, model} = require('mongoose')


const UsuarioShema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },

    img: {
        type: String
    },

    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },  
    
})


module.exports = model( 'Usuario', UsuarioShema)