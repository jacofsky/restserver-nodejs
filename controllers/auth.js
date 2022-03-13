const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");



const login = async(req = request, res = response) => {

    const {email, password} = req.body

    try {

        // Verificar si el email existe

        const usuario = await Usuario.findOne({email})

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            })
        }


        // Si el usuario esta activo

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            })
        }


        // Verificar la contrasenia

            // comparacion de contrase;a con bcrypt
        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            })
        }


        // Generar el JWT

        const token = await generarJWT(usuario.id)



        res.status(200).json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


    
}


module.exports = {
    login,
}