const db = require ('../config/db');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Exportar el middleware para usarlo en la ruta
exports.upload = upload.single('imagen');

// Exportar getProductos
exports.getProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) throw err;

    // Podés enviar los productos a una vista, o mostrar un mensaje si no hay
    if (result.length > 0) {
      res.render('productos', { productos: result });
    } else {
      res.render('productos', { productos: [], mensaje: 'No hay productos disponibles.' });
    }
  });
};



// Guardar nuevo producto (post del formulario)
exports.guardarProducto = (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file?.buffer; // Contenido binario de la imagen

  const sql = 'INSERT INTO productos (nombre, descripcion, precio, imagen, creado_en) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [nombre, descripcion, precio, imagen], (err, result) => {
    if (err) throw err;
    res.redirect('/productos');
  });
};


// Eliminar un producto por ID
exports.eliminarProducto = (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM productos WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      return res.status(500).send('Error interno al eliminar producto.');
    }

    // Redireccionar después de eliminar
    res.redirect('/productos');
  });
};



// Mostrar formulario con datos actuales
exports.editarProducto = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.send('Producto no encontrado');
    res.render('editarProducto', { producto: result[0] });
  });
};

exports.actualizarProducto = [
  upload.single('imagen'),
  (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    let sql = '';
    let valores = [];

    if (imagen) {
      sql = `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ? WHERE id = ?`;
      valores = [nombre, descripcion, precio, imagen, id];
    } else {
      sql = `UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?`;
      valores = [nombre, descripcion, precio, id];
    }

    db.query(sql, valores, (err) => {
      if (err) throw err;
      res.redirect('/productos');
    });
  }
];