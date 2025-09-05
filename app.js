// app.js
const express = require('express');
const path    = require('path');
const routes  = require('./routes/index');
const db      = require('./config/db');

const app = express();
const PORT = 3000;

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// **Montar CSS, JS e imágenes**
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js',  express.static(path.join(__dirname, 'assets/js')));
app.use('/img', express.static(path.join(__dirname, 'assets/img')));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const session = require('express-session');
app.use(session({
  secret: 'mi_secreto_2',
  resave: false,
  saveUninitialized: true
}));

// Rutas
app.use('/', routes);

// Arranque
app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);



