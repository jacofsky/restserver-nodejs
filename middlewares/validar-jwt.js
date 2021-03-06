const { response, request } = require('express')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')


const validarJWT = async(req = request, res = response, next) => {  

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // FORMA PARA ESPARCIR UN VALOR HACIA EL CONTROLER
        // req.uid = uid

        const usuario = await Usuario.findById(uid)

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token invalido'
            })
        }


        // Verificar si uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token invalido'
            })
        }


        req.usuario = usuario

        next()

    } catch (error) {

        console.log(error)
        return res.status(401).json({
            msg: 'Token invalido'
        })
    }


}

module.exports = {
    validarJWT
}