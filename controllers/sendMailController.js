const nodemailer = require('nodemailer');

const enviarCorreo = async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'j.marifil2040@hotmail.com',
      pass: '@Camila2009'
    }
  });

  const mailOptions = {
    from: email,
    to: 'j.marifil2040@hotmail.com',
    subject: 'Nuevo mensaje de contacto',
    html: `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Correo enviado con éxito.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el correo.');
  }
};

module.exports = enviarCorreo;