const { response, request } = require('express')

const categoriasGet = (req = request, res = response) => {
    res.status(200).json({
        msg: 'Sos re piolon'
    })
} 

module.exports = {
    categoriasGet
}