const { response, request } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario')

// Get -> entrega la el json de la res
// Post -> se puede sacar la data del req
// Put -> Saco de los params la var puesta en el route

const usuariosGet = async(req = request, res = response) => {

    // req.query -> para extraer params opcionales

    const {limite = 5, desde = 0} = req.query
    const query = {estado: true}

    // Como la promesa es un array se peude desestructurar como un array
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))    
            .limit(Number(limite))
    ])
    

    res.status(200).json({total, usuarios})
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params
    const {_id, password, google, email, ...resto} = req.body

    
    // Validacion BD
    if (password) {
        // Encriptamos la password
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})


    res.status(200).json({
        msg: 'put API',
        usuario
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

    res.status(201).json({usuario})
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params


    // const uid = req.uid

    // Borrado fisico
    // const usuario = await Usuario.findByIdAndDelete(id)

    // Cambiado de estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.status(200).json({usuario})
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

