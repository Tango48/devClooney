const mysql = require ('mysql2');

const connection = mysql.createConnection({
   host :'localhost',
   user: 'root',

   
   password: '',
   database:'tienda'
});

connection.connect ((err) =>{
    if(err) throw err;
    console.log ('Conectado OK!');
});

module.exports= connection;