function checkLogin( ) {
    if(sessionStorage.getItem('loggedIn') == true){
        return;
    } else {
        window.location.href = 'login';
    }
    console.log('asdf');
}

module.exports = {
    checkLogin
}