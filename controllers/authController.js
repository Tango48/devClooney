
// CARGAMOS
const db = require ('../config/db');

// Exportar LoginForm
exports.loginForm = (req, res) => {
  res.render('login', { error: null });
};

// Exportar autenticar
exports.autenticar = (req, res) => {
  const { usuario, clave } = req.body;

  db.query(
    'SELECT * FROM usuarios_login WHERE usuario = ? AND clave = ?',
    [usuario, clave],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        req.session.mensaje = 'Login OK, Bienvenido!';
        return res.redirect('/menu');
      } else {
        res.render('login', { error: 'Usuario o Clave Incorrecto!' });
      }
    }
  );
};