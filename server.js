const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'robertoparetdev@gmail.com', // Tu correo electrónico
    pass: 'bhde jfnl tyjm acls' // Aquí debes utilizar una contraseña de aplicación de Google
  },
});

// Ruta para manejar el envío de formularios
app.post('/api/contact', (req, res) => {
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
