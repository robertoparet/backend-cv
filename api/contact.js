const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'robertoparetdev@gmail.com', // Tu correo electrónico
    pass: 'bhde jfnl tyjm acls' // Aquí debes usar una contraseña de aplicación de Google
  },
});

// Ruta para manejar el envío de formularios
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `${name} <${email}>`, // El correo del usuario
    to: 'robertoparetdev@gmail.com', // Tu correo
    subject: `Nuevo mensaje de ${name}`,
    text: message,
    replyTo: email, // Responder a la dirección del usuario
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo');
    }
    console.log('Correo enviado:', info.response);
    return res.status(200).send('Correo enviado con éxito');
  });
});

module.exports = router;
