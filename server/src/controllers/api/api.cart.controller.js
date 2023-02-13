let db = require("../../../database/models")
const Op = db.Sequelize.Op
const { validationResult, body } = require('express-validator')

const productsApiController = {
    checkout: async function (req,res) {
        
        let order = await db.Carrito.create(
            {
                ...req.body,
                user_id: req.session.usuarioLogeado.id,
                
            },
            {
                include: ['carrito_producto']
            }
        )
        res.json({ok: true, status: 200, order: order})
    }
}

module.exports = productsApiController