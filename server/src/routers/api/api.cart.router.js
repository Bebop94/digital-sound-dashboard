const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();

const productApiController = require("../../controllers/api/api.cart.controller");

router.post('/checkout', productApiController.checkout)

module.exports = router;