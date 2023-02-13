
let db = require("../../../database/models")
const Op = db.Sequelize.Op
// const { validationResult, body } = require('express-validator')

const productsApiController = {
    allItems: (req,res) => {
        promesaCategoria = db.Categoria.findAll()
        promesaProductos = db.Producto.findAll({include: ['categoria','marca']})

        Promise.all([promesaCategoria,promesaProductos])
        .then(function([categorias, productos]) {

            let countByCategory = {}
            categorias.forEach(categoria => {
                countByCategory[categoria.category_name] = productos.filter(producto => producto.category_id == categoria.id).length
            })

            res.json({
                count: productos.length,
                countByCategory: countByCategory,
                products: productos.map(producto => {
                    return {
                        id: producto.id,
                        product_name: producto.product_name,
                        product_description_short: producto.product_description_short,
                        product_price: producto.product_price,
                        product_stock: producto.product_stock,
                        category: [producto.categoria.category_name],
                        detail: `http://localhost:3030/productos/detalle/${producto.id}`,
                        imagen: `http://localhost:3030/img/products/${producto.product_images}`,
                    }
                })
            })
        })
    },
    item: (req,res) => {
        db.Producto.findByPk(req.params.id, {include: ['categoria','marca']})
        .then(producto => {
            res.json({
                id: producto.id,
                product_name: producto.product_name,
                product_description_short: producto.product_description_short,
                product_description_long: producto.product_description_long,
                product_price: producto.product_price,
                flag_hot_product: producto.flag_hot_product,
                flag_used_product: producto.flag_used_product,
                product_stock: producto.product_stock,
                category: [producto.categoria.category_name],
                // marca: [producto.marca.brand_name]
                imagen: `http://localhost:3030/img/products/${producto.product_images}`, 
            })
        })
    },
    checkout: async function (req,res) {
        
        let order = await db.Carrito.create(
            {
                ...req.body,
                user_id: req.session.usuarioLogeado.id,
                
            },
            {
                include: db.Carrito.CarritoProducto
            }
        )
        res.json({ok: true, status: 200, order: order})
    }
}

module.exports = productsApiController