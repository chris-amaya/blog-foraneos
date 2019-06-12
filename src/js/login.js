import css from '../assets/css/login.css';
import { MDCSnackbar } from '@material/snackbar';
const snackbar            = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const campoMostrarErrores = document.getElementById('mostrarErrores');
const buttonRecordar      = document.getElementById('buttonRecordar');
const inputRecordar       = document.getElementById('recordar');
const email               = document.getElementById('email');
const password            = document.getElementById('password');

//========================================================================================
/*                                                                                      *
 *                                        EVENTOS                                       *
 *                                                                                      */
//========================================================================================

document.addEventListener('click', (e) => {
    if (e.target.id == 'buttonLogin') {
        e.preventDefault();
        if (validarFormulario()) {
            const resp = login();
            if(resp && resp.redirect == true) {
                if(recordar) { 
                    localStorage.setItem('name', resp.name);
                    localStorage.setItem('img', resp.img);
                    localStorage.setItem('loggedIn', resp.loggedIn);
                } else if(!recordar) {
                    sessionStorage.setItem('name', resp.name);
                    sessionStorage.setItem('img', resp.img);
                    sessionStorage.setItem('loggedIn', resp.loggedIn);
                }
                window.location.href = 'panel';
            }
        }
    }
})

let recordar = false;
buttonRecordar.addEventListener('click', () => {
    if (!recordar) {
        buttonRecordar.style = `background: url(https://cdn.tutsplus.com/webdesign/uploads/legacy/tuts/391_checkboxes/check_radio_sheet.png) -19px top no-repeat;`
        recordar = true;
        inputRecordar.checked = true;

    } else if (recordar) {
        buttonRecordar.style = `background:url(https://cdn.tutsplus.com/webdesign/uploads/legacy/tuts/391_checkboxes/check_radio_sheet.png) left top no-repeat;`;
        recordar = false;
        inputRecordar.checked = false;
    }

});

//========================================================================================
/*                                                                                      *
 *                                       FUNCIONES                                      *
 *                                                                                      */
//========================================================================================


function validarFormulario() {
    let error = false;
    let mensajesError = [];

    if (email.value == null || email.value.length == 0 || /^\s+$/.test(email.value)) {
        mensajesError.push('el email no debe de ir vacío o lleno solamente de espacios en blanco');
        error = true;
    }

    if (password.value == null || password.value.length == 0) {
        mensajesError.push('debe de escribir una contraseña');
        error = true;
    }

    if (error) {
        // establecer los estilos para mostrar el error en pantalla
        campoMostrarErrores.style = `
            animation-name: top;
            position: relative;
            opacity: 1;
            display: block;
            top: 0px;
        `;

        campoMostrarErrores.innerHTML = '';
        for (let i = 0; i < mensajesError.length; i++) {
            campoMostrarErrores.innerHTML +=
                `<li>${mensajesError[i]}</li>`;
        }
        email.style.borderBottomColor = '#f44336';
        password.style.borderBottomColor = '#f44336';
        return false;
    } else if (!error) {
        campoMostrarErrores.style.display = 'none';
        return true;
    }
}

async function login() {
    const userObject = {
        email: email.value,
        password: password.value,
        methodLogin: 'normal'
    }
    const req = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resp = await req.json();
    if(resp.ok == true) {
        return resp;
    } else {
        return false;
    }

}


//========================================================================================
/*                                                                                      *
 *                                   LOGEO POR GOOGLE                                   *
 *                                                                                      */
//========================================================================================


async function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();
    const userObject = {
        // name: profile.getName(),
        // img: profile.getImageUrl(),
        email: profile.getEmail(),
        methodLogin: 'google',
    }
    const request = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resp = await request.json();
    console.log(resp);

    if (iniciarSession(resp)) {
        window.location.href = 'panel';
    }
}

function iniciarSession(req) {
    if (req.loggedIn == true || req.loggedIn == "true" && req.redirect == true || req.redirect == 'true') {
        sessionStorage.setItem('LoggedIn', req.loggedIn);
        return true;
    } else if (!req.loggedIn || req.loggedIn == 'false' || req.loggedIn == false) {
        return false;
    }

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

window.onSignIn = onSignIn;
window.signOut = signOut;