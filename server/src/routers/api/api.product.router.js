const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();

const productApiController = require("../../controllers/api/api.product.controller");

router.get('/', productApiController.allItems)
router.get('/item/:id', productApiController.item)
// router.post('/cart/checkout', productApiController.checkout)
router.get('/search/:keyword', productApiController.search)

module.exports = router;