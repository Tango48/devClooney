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
const sendMailController = require('../controllers/sendMailController');
const productosController = require('../controllers/productosController');


// — Autenticación —
router.get('/login',  authController.loginForm);
router.post('/login', authController.autenticar);


// — Páginas post-login —
router.get('/menu', (req, res) => {
  const mensaje = req.session.mensaje;
  delete req.session.mensaje; // Para que no se muestre de nuevo al recargar
  res.render('menu', { mensaje });
});
router.get('/productos', productosController.getProductos);
//router.post('/productos/nuevo', productosController.guardarProducto);
router.post('/productos/nuevo',productosController.upload,productosController.guardarProducto);
router.delete('/productos/:id', productosController.eliminarProducto);
router.get('/productos/:id/editar', productosController.editarProducto); // NUEVA RUTA
router.put('/productos/:id', productosController.actualizarProducto);    // ACTUALIZACIÓN


router.get('/contact', (req, res) => res.render('contact'));
router.post('/enviar-contacto', sendMailController);
// — Root (redirección opcional) —
router.get('/', (req, res) => res.redirect('/login'));

module.exports = router;