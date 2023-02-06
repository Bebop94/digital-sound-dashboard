const { body } = require('express-validator');
const path = require('path');
const fs = require("fs");
const db = require("../../database/models");

module.exports = [
    body('nombre')
    .notEmpty().withMessage('Necesitas completar tu nombre').bail()
    .isLength({min:2}).withMessage('El nombre debe tener al menos 2 caracteres')
    .matches(/^[A-Za-z]+$/).withMessage('El nombre debe contener solamente letras'),
    body('apellido')
    .notEmpty().withMessage('Necesitas completar tu apellido').bail()
    .isLength({min:2}).withMessage('El apellido debe tener al menos 2 caracteres')
    .matches(/^[A-Za-z]+$/).withMessage('El apellido debe contener solamente letras'),
    body('email')
    .notEmpty().withMessage('Necesitas ingresar un email').bail()
    .isEmail().withMessage('Necesitas ingresar un email valido').bail()
    .custom((value) => {
        return db.Usuario.findOne({
            where: {
                user_email: value
            }
        })
        .then(user => {
            if(user) {
                return Promise.reject('Este email ya se encuentra registrado')
            } 
        })
    }),
    body('password')
        .notEmpty().withMessage('Necesitas ingresar una contraseña').bail()
        .isStrongPassword().withMessage('La contraseña necesita al menos: 8 char, 1 num, 1 may, 1 min, 1 simbolo'),
        body('password2')
        .notEmpty().withMessage('Necesitas repetir la constraseña').bail()
        .custom((value, { req }) => {
            let oldPass = req.body.password;
            if (oldPass != value) {
                throw new Error('Las contraseñas no coinciden')
            }
            
            return true
        })
]