// api/contact.js

const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'robertoparetdev@gmail.com', // Tu correo electrónico
    pass: 'bhde jfnl tyjm acls' // Contraseña de aplicación de Google
  },
});

// Habilitar CORS
const corsHandler = cors({
  origin: '*', // Permite todas las fuentes. Puedes restringirlo si es necesario.
});

// Manejar la solicitud POST para enviar el correo
module.exports = (req, res) => {
  corsHandler(req, res, () => {
    if (req.method === 'POST') {
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
    } else {
      res.status(405).send('Método no permitido'); // Si no es un POST
    }
  });
};
