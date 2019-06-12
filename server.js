require('./config/config');
const app = require('./app');
const mongoose = require('mongoose');
const colors = require('colors');

let date = new Date().toLocaleTimeString();

mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, res) => {
    if(err) {
        throw err;
    }
    console.log(`Conexión a la BD establecida ${ colors.green(date) }`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} ${colors.green(date)}`);
}) 

