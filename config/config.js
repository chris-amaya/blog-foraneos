// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 5000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/blog-foras';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
// process.env.CLIENT_ID = process.env.CLIENT_ID || '219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com';

// Google Client ID
// 894220436027-6kf0tnl8ep8p1vms7oe9a7rm4oocfn3i.apps.googleusercontent.com

// Google Client Secret
// -bEMFS6gFW1mYrKM3_tLXwje