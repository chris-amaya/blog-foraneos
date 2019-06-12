import css from '../assets/css/login.css';


const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPassword2 = document.getElementById('password2');
const campoMostrarErrores = document.getElementById('mostrarErrores');


//========================================================================================
/*                                                                                      *
 *                                        EVENTOS                                       *
 *                                                                                      */
//========================================================================================

document.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.id == 'buttonRegistro') {
        e.preventDefault();
        registro();
    }
    if(e.target.id == 'gSignInWrapper') {
        startApp();
    }
});

//========================================================================================
/*                                                                                      *
 *                                       FUNCIONES                                      *
 *                                                                                      */
//========================================================================================

async function registro() {
    resetearColoresFormulario();
    if(validacionFormulario()) {
        let userInfo = {
            nombre: inputNombre.value,
            email: inputEmail.value,
            password: inputPassword.value,
            methodRegister: 'normal'
        }
        let req = await fetch('/api/registro', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let resp = await req.json();
        console.log(resp);
        if(resp.ok === true) {
            window.location.href = 'panel';
        } else if(resp.ok === false) {
            mostrarErrores(resp.message);
        }
    }

}

function validacionFormulario() {
    let errores = [];
    let error = false;
    if (inputNombre.value.length < 2) {
        errores.push('ingrese un nombre correcto'); 
        inputNombre.style.borderBottomColor = '#f44336';
    }

    // if (inputApellidos.value.length < 2) { 
    //     errores.push('ingrese sus apellidos correctos'); 
    //     inputApellidos.style.borderBottomColor = '#f44336';
    // }

    if(inputEmail.value < 5) {
        errores.push("el corro electrónico ingresado no es válido");
        inputEmail.style.borderBottomColor = '#f44336';
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(!inputEmail.value)) {
            errores.push("La dirección de email " + inputEmail.value + " es incorrecta.");
            inputEmail.style.borderBottomColor = '#f44336';
        }
    }
    if(inputPassword.value.length <= 5) {
        errores.push('la contraseña debe de ser mayor a 5 caracteres');
        inputPassword.style.borderBottomColor = '#f44336'; 
        inputPassword2.style.borderBottomColor = '#f44336';
    }

    if(inputPassword.value != inputPassword2.value){
        errores.push('las contraseñas no coinciden'); 
        inputPassword.style.borderBottomColor = '#f44336'; 
        inputPassword2.style.borderBottomColor = '#f44336';
    }

    if(errores.length > 0) error = true; 

    if (error) {
        // establecer los estilos para mostrar el error en pantalla
        mostrarErrores(errores)
        return false;
    } else if (!error) {
        campoMostrarErrores.style.display = 'none';
        return true;
    }
}

function mostrarErrores(errores) {
    campoMostrarErrores.style = `
        animation-name: top;
        position: relative;
        opacity: 1;
        display: block;
        top: 0px;
    `;
    campoMostrarErrores.innerHTML = '';
    if(Object.prototype.toString.call(errores) == "[object String]") {
        campoMostrarErrores.innerHTML += `<li>${errores}</li>`
    } else if(Object.prototype.toString.call(errores) == "[object Array]") {
        for (let i = 0; i < errores.length; i++) {
            campoMostrarErrores.innerHTML +=
                `<li>${errores[i]}</li>`;
        }

    }
    

}

function resetearColoresFormulario() {
    inputNombre.style.borderBottomColor = '#fff';
    inputEmail.style.borderBottomColor = '#fff';
    inputPassword.style.borderBottomColor = '#fff';
    inputPassword2.style.borderBottomColor = '#fff';
}
//========================================================================================
/*                                                                                      *
 *                                  REGISTRO POR GOOGLE                                 *
 *                                                                                      */
//========================================================================================

async function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();
    const userObject = {
        name: profile.getName(),
        img: profile.getImageUrl(),
        email: profile.getEmail(),
        methodLogin: 'google',
        google: true
    }
    const request = await fetch(`http://localhost:5000/api/registro`, {
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

// let gSignInWrapper = document.getElementById('gSignInWrapper');

var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '894220436027-6kf0tnl8ep8p1vms7oe9a7rm4oocfn3i.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
              googleUser.getBasicProfile().getName();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
