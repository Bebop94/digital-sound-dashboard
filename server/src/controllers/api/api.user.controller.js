let db = require("../../../database/models")
const Op = db.Sequelize.Op

module.exports = {

    users: (req, res) => {
        db.Usuario
        .findAll()
        .then( users => {
            return res.status(200).json({
                count: users.length,
                users: users,
                status: 200
            })
        })
    },

    usersDetail: (req, res) => {
        db.Usuario
        .findByPk(req.params.id)
        .then(user => {
            return res.status(200).json({
                users: user,
                status: 200
            })
        })
    }

}