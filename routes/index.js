//Obtencion de de los modulos

/**const express = require('express');
const router = express.Router();

//Obtener el controlador
const authController = require('../controllers/authController');

//Enrutamos
router.get('/',(req,res)=>{
   res.redirect('/login');
});

router.get('/login',authController.loginForm);
router.post('/autenticar', authController.autenticar);

module.exports = router; 

*/

const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/authController');

// — Autenticación —
router.get('/login',  authController.loginForm);
router.post('/login', authController.autenticar);

// — Páginas post-login —
router.get('/menu', (req, res) => {
  const mensaje = req.session.mensaje;
  delete req.session.mensaje; // Para que no se muestre de nuevo al recargar
  res.render('menu', { mensaje });
});
router.get('/productos', (req, res) => res.render('productos'));
router.get('/contact', (req, res) => res.render('contact'));

// — Root (redirección opcional) —
router.get('/', (req, res) => res.redirect('/login'));

module.exports = router;