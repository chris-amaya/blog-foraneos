function login(req, res) {
    const receta = req.params.receta;
    res.render('./admin/index.hbs', {
        receta
    });
} 


module.exports = {
    login
}