const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('nombreProd')
    .notEmpty().withMessage('El producto debe tener un nombre').bail()
    .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('descripcionProd')
    .notEmpty().withMessage('El producto debe tener una descripción').bail()
    .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('precioProd')
    .notEmpty().withMessage('El producto debe tener un precio'),

    body('fotoProd').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg']
        if (file) {
            let fileExtension = path.extname(file.originalname);

            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]

