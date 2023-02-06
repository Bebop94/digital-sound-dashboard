const express = require("express");
const router = express.Router(); 

const apiUserController = require("../../controllers/api/api.user.controller")

router.get('/', apiUserController.users)
router.get('/:id', apiUserController.usersDetail)

module.exports = router