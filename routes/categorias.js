const Router = require('express')
const { check } = require("express-validator")

const { validarCampos } = require("../middlewares/validar-campos")

const { categoriasGet } = require("../controllers/categorias")
const router = require('./usuarios')

const route = Router()

// Obtener todas las categorias - publico
route.get('/', categoriasGet)

// Obtener una categoria por id - publico
route.get('/:id', categoriasGet)

// Crear una nueva categoria - privado - necesita token valido
route.post('/', categoriasGet)

// Actualizar - privado - necesita token valido
route.put('/:id', categoriasGet)

// Borrar una categoria - Admin
route.delete('/:id', categoriasGet)


module.exports = route