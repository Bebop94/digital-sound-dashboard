let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'CarritoProducto';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        product_name: {
            type: dataTypes.STRING
        },
        product_price: {
            type: dataTypes.FLOAT(11,2)
        },
        product_quantity: {
            type: dataTypes.INTEGER
        }

    };

    let config = {
        tableName: 'carts_products',
        timestamps: false
    }

    let Carrito_Producto = sequelize.define(alias, cols, config)

    Carrito_Producto.associate = function(models) {
        Carrito_Producto.belongsTo(models.Carrito, {
            as: 'carrito',
            foreignKey: 'cart_id'
        })
        Carrito_Producto.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey: 'product_id'
        })
    }

    return Carrito_Producto
}