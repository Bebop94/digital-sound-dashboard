const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();

const cartApiController = require("../../controllers/api/api.cart.controller");

router.post('/checkout', cartApiController.checkout)

module.exports = router;