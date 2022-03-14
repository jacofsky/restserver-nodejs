const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");



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

const googleSingIn = async(req = request, res = response) => {
    
    const {id_token} = req.body

    try {

        const {email, nombre, img} = await googleVerify(id_token)
        
        let usuario = await Usuario.findOne({email})
        
        // Usuario no existe
        if (!usuario) {
            const data = {
                nombre,
                email,
                password: ':P',
                rol: 'USER_ROLE',
                img,
                google: true
            }

            usuario = new Usuario(data)
            await usuario.save()
        }
        
        // Si el usuario en DB gogle false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }
        
        console.log(usuario)
        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

    

}


module.exports = {
    login,
    googleSingIn
}