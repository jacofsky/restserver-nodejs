const {Router} = require('express')
const { check } = require('express-validator')


const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

const { esRoleValido, emailExiste, existeIdUsuario } = require('../helpers/db-validatos')

const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares')


const router = Router()


router.get('/', usuariosGet)

// el check funciona tanto para params como body
router.put('/:id', [
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom(existeIdUsuario),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
        check('email', 'El email no es valido').isEmail(),
        check('email', 'El email no es valido').custom(emailExiste),
        check('rol').custom(esRoleValido),
        validarCampos
    ], usuariosPost)

// los midelwares pueden transportar informacion mediante el req
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom(existeIdUsuario),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router






