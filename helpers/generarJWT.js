const jwt = require("jsonwebtoken")



const generarJWT = (uid = '') => {
    
    return new Promise( (resolve, reject) => {

        const payload = {uid}

        // (payload, key para firmar el token, option, calback con reject y resolve)
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {expiresIn: '4h'}, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })



    })
}

module.exports = {
    generarJWT
}