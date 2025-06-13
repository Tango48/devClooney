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