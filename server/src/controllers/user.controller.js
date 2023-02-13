const fs = require("fs");
const path = require("path");
const { validationResult, body } = require('express-validator')
const bcrypt = require('bcryptjs')
let db = require("../../database/models")

const usersController = {


    profile: (req,res) => {
        db.Usuario.findByPk(req.session.usuarioLogeado.id)
        .then(usuario => {
            res.render('users/profile', {usuario})
        })
    },
    
    registro: (req, res) => {

        res.render("users/registro")
    },

    // POST para crear un usuario nuevo

    creacionUsuario: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("users/registro", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        db.Usuario.create({
            user_first_name: req.body.nombre,
            user_last_name: req.body.apellido,
            user_email: req.body.email,
            user_password: bcrypt.hashSync(req.body.password, 10),
            user_images: null,
            user_type: "usuario"
        })
        .then(() => {
            res.redirect("login");
        })

    },

    login: (req, res) => {

        res.render("users/login")
    },

    processLogin: (req, res) => {
        let resultValidation = validationResult(req);
        let usuarioALogearse

        if (resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped()
            })
        }

        else {
            db.Usuario.findAll()
            .then(usuarios => {
                for (i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].user_email == req.body.email) {
                        if (bcrypt.compareSync(req.body.password, usuarios[i].user_password)) {
                            usuarioALogearse = usuarios[i]
                            break;
                        }
                    }
                }

                if (usuarioALogearse == undefined) {
                    return res.render('users/login', {
                        errors: [{msg: 'Credenciales invalidas'}]
                    })
                };
        
                req.session.usuarioLogeado = usuarioALogearse;

                if (req.body.remember != undefined) {
                    res.cookie('recordame',
                    usuarioALogearse.id,
                    {maxAge: 1000*60*60})
                }

                res.redirect('/index')
            })
        }
    },

    logout: (req,res) => {
        req.session.usuarioLogeado = undefined
        res.cookie('recordame', '', {maxAge: 0})
        res.redirect('/index')
    },

    // peticion por GET para acceder a la pagina de admin de usuarios
    admin: (req, res) => {
        db.Usuario.findAll()
        .then(usuarios => {
            res.render("users/abm-usuario", {usuarios, usuario : req.session.usuarioLogeado});
        })
    },

    // peticion por GET que muestra el formulario de creacion de usuario
    formulario: (req, res) => {

        res.render("users/alta-usuario", {usuario : req.session.usuarioLogeado});
    },

    // Peticion por POST que crea el usuario desde ABM
    creacionAdmin: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("users/alta-usuario", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            db.Usuario.create({
                user_first_name: req.body.nombre,
                user_last_name: req.body.apellido,
                user_email: req.body.email,
                user_password: bcrypt.hashSync(req.body.password, 10),
                user_images: req.file.filename,
                user_type: "admin"
            })
            .then(() => {
                res.redirect("/users/abm-usuarios");
            })
        }
    }


};

module.exports = usersController;

