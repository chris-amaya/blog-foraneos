const Usuario = require('../models/users.model');
const bcrypt = require('bcrypt');


//========================================================================================
/*                                                                                      *
 *                                       REQUESTS                                       *
 *                                                                                      */
//========================================================================================

function apiLogin(req, res) {
    const body = req.body;
    const methodLogin = body.methodLogin;

    if(methodLogin == 'google') {
        let userInfo = {
            // nombre: body.name,
            // email: body.email,
            // img: body.img,
            password: ':)',
            google: true
        }

        if(!existsUser(userInfo)) {
            res.status(400).json({
                ok: false,
                message: 'Ha ocurrido un error, quizás aún no se ha registrado'
    
            })
            
        } 
        res.json({
            ok: true,
            // google: true,
            // methodLogin: 'google',
            redirect: true,
            loggedIn: false

        })
        
    } else if(methodLogin == 'normal') {
        console.log(req.body);
        let resp = loginNormal(req.body);
        if(resp) {
            res.json({
                redirect: true,
                loggedIn: true,
                ok: true,
                // parametros  que se necesitan para guardarlos en el Session o LocalStorage
                name: resp.nombre,
                img: resp.img
            })
        } else {
            res.status(400).json({
                ok: false,
                message: 'error o contraseña incorrectas'
    
            })
        }
    }

}

async function apiRegistro(req, res) {
    let body = req.body;
    if(body.methodRegister == 'normal' ) {
        body.password = bcrypt.hashSync(body.password, 10);
        let user = await registrarUsuario(body);
        if(user) {
            res.json({
                ok: true,
                message: 'Ha sido registrado correctamente'
                
            })
        } else {
            res.status(501).json({
                ok: false,
                message: 'Ha ocurrido un problema en su registro'
                
            })
        }
    } else if(body.methodRegister == 'google') {
        body.password = bcrypt.hashSync(':)', 10);
        let user = await registrarUsuario(body)
        if(user) {
            res.json({
                ok: true,
                message: 'Registro via google ha sido completado exitosamente'
            })
        } else {
            console.error({
                msg: 'Ha ocurrido un error al registrar usuario via google',
                user
            });
            res.status(400).json({
                msg: 'Ha ocurrido un error al registrar usuario via google',
                user
            })
        }
    }


}

//========================================================================================
/*                                                                                      *
 *                                       FUNCIONES                                      *
 *                                                                                      */
//========================================================================================


// metódo para comprobar que el usuario sea el correcto en la BD por el método de autenticación normal
function loginNormal(infoUser) {
    Usuario.find({ email:  infoUser.email, password: infoUser.password})
    .limit(1)
    .exec((err, user) => {
        if(user) return true;
        else return false;
    });
}

function existsUser(infoUser) {
    Usuario.find({email: infoUser.email})
    .limit(1)
    .exec((err, user) => {
        if(user) {
            return user;
        } else {
            return err;
        }
    }
)}
    


async function registrarUsuario(infoUser) {
    let usuario = new Usuario(infoUser);
    let resp = await usuario.save();
    return resp;
}

//========================================================================================
/*                                                                                      *
 *                                    RESPONSES HTTP                                    *
 *                                                                                      */
//========================================================================================


function login(req, res) {
    res.render('login');
}

function home(req, res) {
    const receta = req.params.receta;
    res.render('index', {
        receta
    });
} 

function recetas(req, res) {
    const receta = req.params.receta;
    res.render('recetas', {
        receta
    });
}

function desayunos(req, res) {
    const receta = req.params.receta;
    res.render('single', {
        receta
    });
}

function registro(req, res) {
    res.render('registro', {

    });
}


module.exports = {
    home,
    recetas,
    desayunos,
    login,
    apiLogin,
    registro, 
    apiRegistro
}