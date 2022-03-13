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
        // revisar aca que peude haber un error !!
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
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

UsuarioShema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}


module.exports = model( 'Usuario', UsuarioShema)