const { response, request } = require('express')


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

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body

    res.status(201).json({
        msg: 'post API',
        nombre,
        edad
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

