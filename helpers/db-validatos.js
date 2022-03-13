const Role = require('../models/rol')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRole = await Role.findOne({rol})

    if (!existeRole) {
        throw new Error(`El rol: ${rol} no existe`)
    }
}

const emailExiste = async(email = '') => {
    const existeEmail = await Usuario.findOne({email})

    if (existeEmail) {
        throw new Error(`El email: ${email} ya esta registrado`)
    }
}

const existeIdUsuario = async(id) => {
    const idExsite = await Usuario.findById(id)

    if (!idExsite) {
        throw new Error(`El ID: ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeIdUsuario
}