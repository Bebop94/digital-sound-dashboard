let db = require("../../database/models")
const Op = db.Sequelize.Op
const { validationResult, body } = require('express-validator')
const url = require('url');
const e = require("express");

const productsController = {

    // Response de la sección Guitarras y Bajos
    categoria: (req, res) => {

        let idCategoria = req.params.id
        promesaCategoria = db.Categoria.findByPk(idCategoria)
        promesaProductos = db.Producto.findAll({
            where: {category_id: idCategoria}
        })

        Promise.all([promesaCategoria,promesaProductos])
        .then(function([categoria,filtrados]) {    
            res.render("products/categoria", {categoria, filtrados, usuario : req.session.usuarioLogeado});
        })

    },

    // Response para el producto/item que viene por ruta parametrizada con req.params ID
    item: (req, res) => {

        db.Producto.findByPk(req.params.id)
        .then(producto => {
            res.render("products/detalle-producto", {producto, usuario : req.session.usuarioLogeado})
        })

    },

    // Response para la pag de ABM de productos 
    abm: (req, res) => {
        promesaCategoria = db.Categoria.findAll()
        promesaProductos = db.Producto.findAll()

        Promise.all([promesaCategoria,promesaProductos])
        .then(function([categories,products]) {    
            res.render("products/abm-producto", {products, categories, usuario : req.session.usuarioLogeado});
        })

    },

    // Peticon GET para acceder al formulario de creacion de productos
    formulario: (req, res) => {
        db.Categoria.findAll()
        .then(categories => {
            res.render("products/alta-producto", {categories, usuario : req.session.usuarioLogeado});
        })
    },

    // POST para crear un producto nuevo
    creacion: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            db.Categoria.findAll()
            .then(categories => {
                return res.render("products/alta-producto", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    categories
                })
            })
        } else {
            db.Producto.create({
                product_name: req.body.nombreProd,
                product_description_short: req.body.subtituloProd,
                product_description_long : req.body.descripcionProd,
                product_price: parseInt(req.body.precioProd),
                product_images: req.file.filename,
                flag_hot_product: req.body.lanzamiento == '1' ? true:false,
                flag_used_product: req.body.usado == '1' ? true:false,
                category_id: parseInt(req.body.categoriaProd)
            })
            .then(function() {
                let redirectPath = 'categoria/'+req.body.categoriaProd.toString()
                res.redirect(redirectPath)
            })
        }

    },

    // Reponse para baja de un producto
    confirmarBaja: (req, res) => {
        db.Producto.findByPk(req.params.id)
        .then(producto => {
            res.render("products/baja-producto", {producto, usuario : req.session.usuarioLogeado});
        })
    },

    eliminar: (req,res) => {
        db.Producto.destroy({
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect('/productos/abm-productos')
        })
    },

    // Reponse para editar de un producto
    editar: (req, res) => {
        
        promesaCategoria = db.Categoria.findAll()
        promesaProductos = db.Producto.findByPk(req.params.id)

        Promise.all([promesaCategoria,promesaProductos])
        .then(function([categories,editable]) {
            res.render("products/edicion-producto", {editable, categories, usuario : req.session.usuarioLogeado});
        })
    },

    confirmarEdicion: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            db.Categoria.findAll()
            .then(categories => {
                return res.render("products/edicion-producto", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    categories
                })
            }) 
        } else {  
            db.Producto.findByPk(req.params.id)
            .then(producto => {
                db.Producto.update({
                    product_name: req.body.nombreProd,
                    product_description_short: req.body.subtituloProd,
                    product_description_long : req.body.descripcionProd,
                    product_price: parseInt(req.body.precioProd),
                    product_images: !req.file ? producto.product_images: req.file.filename,
                    flag_hot_product: req.body.lanzamiento == '1' ? true:false,
                    flag_used_product: req.body.usado == '1' ? true:false,
                    category_id: parseInt(req.body.categoriaProd)
                }, {
                    where: {id : req.params.id}
                })
            })
            .then(() => {
                res.redirect('/productos/abm-productos')
            })
        }

    },

    // Response para accedor a los "nuevos ingresos"
    nuevosIngresos:  (req, res) => {

        // Refactor. Se miran todos los nuevos ingresos, luego se agrupa por cats en ejs.
        promesaCategoria = db.Categoria.findAll()
        promesaProductos = db.Producto.findAll({
            where: {flag_hot_product: 1}
        })

        Promise.all([promesaCategoria,promesaProductos])
        .then(function([categories,nuevosIngresos]) {
            res.render("products/nuevos-ingresos", {nuevosIngresos, categories, usuario : req.session.usuarioLogeado}); 
        })

    },

    // Response para accedor a los "usados"
    usados:  (req, res) => {

        // Refactor. Se miran todos los usados, luego se agrupa por cats en ejs.
        promesaCategoria = db.Categoria.findAll()
        promesaProductos = db.Producto.findAll({
            where: {flag_used_product: 1}
        })

        Promise.all([promesaCategoria,promesaProductos])
        .then(function([categories,productosUsados]) {
            res.render("products/usados", {productosUsados, categories, usuario : req.session.usuarioLogeado});
        })
    },
    search: (req, res) => {
        let queryString = url.parse(req.url, true).query
        db.Producto.findAll({
            where: {
                product_name: {
                    [Op.like]: "%"+queryString.value+"%"
                }
            }
        })
        .then(results => {
            res.render("index", {title: 'Resultados de Búsqueda',results, usuario : req.session.usuarioLogeado})
        })
    }
};

module.exports = productsController;