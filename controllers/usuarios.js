const { response, request } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario')

// Get -> entrega la el json de la res
// Post -> se puede sacar la data del req
// Put -> Saco de los params la var puesta en el route

const usuariosGet = (req = request, res = response) => {

    // req.qury -> para extraer params opcionales
    const query = req.query

    res.status(200).json({
        msg: 'get API',
        query
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.status(200).json({
        msg: 'put API',
        id
    })
}

const usuariosPost = async(req, res = response) => {

    const {nombre, email, password, rol} = req.body
    const usuario = new Usuario({nombre, email, password, rol})

    // Verficiamos si el correo existe
    const existeEmail = await Usuario.findOne({email})

    if (existeEmail) {
        return res.status(400).json({
            msg: 'Correo existente'
        })
    }

    // Encriptamos la password
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)
    

    // Guardamos en BD
    await usuario.save()

    res.status(201).json({
        msg: 'post API',
        usuario
    })
}

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: 'delete API'
    })
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'patch API'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}

