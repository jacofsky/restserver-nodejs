const { response, request } = require('express')
const Categoria = require('../models/categorias')

const categoriasGet = (req = request, res = response) => {
    res.status(200).json({
        msg: 'Sos re piolon'
    })
} 

const categoriasPost = async(req = request, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase()
    
    const categoriaDB = await Categoria.findOne({nombre})
    
    if(categoriaDB) {
        res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya fue creada`
        })
    }
    
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data)

    await categoria.save()
    
    res.status(201).json(categoria)
}

module.exports = {
    categoriasGet,
    categoriasPost
}