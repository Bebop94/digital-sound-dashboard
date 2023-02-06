const { body } = require('express-validator');
const path = require('path');
const fs = require("fs");
const db = require("../../database/models");


module.exports = [
    body('nombreProd')
    .notEmpty().withMessage('El producto debe tener un nombre').bail()
    .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('subtitulProd')
    .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('precioProd')
    .notEmpty().withMessage('El producto debe tener un precio'),

    body('fotoProd').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']
        if (!file) {
            throw new Error('Necesitas subir una imagen')
        }   
        else {
            let fileExtension = path.extname(file.originalname);

            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    })
]

