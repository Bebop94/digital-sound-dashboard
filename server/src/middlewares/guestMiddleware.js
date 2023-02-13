function guestMiddleware(req,res,next) {
    if (req.session.usuarioLogeado == undefined) {
        next();
    } else {
        res.redirect('perfil')
    }
}

module.exports = guestMiddleware