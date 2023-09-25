const nodemailer = require('nodemailer');

// Configuración de transporte de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Cambia el servicio de correo según tus necesidades
  auth: {
    user: 'tucorreo@gmail.com', // Cambia a tu dirección de correo
    pass: 'tupassword', // Cambia a tu contraseña
  },
});

// Función para enviar el correo de recuperación
function enviarCorreoRecuperacion(destinatario, token) {
  const mailOptions = {
    from: 'tucorreo@gmail.com', // Cambia a tu dirección de correo
    to: destinatario,
    subject: 'Recuperación de Contraseña',
    text: `Haga clic en el siguiente enlace para restablecer su contraseña: http://tudominio.com/restablecer-contrasena?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo de recuperación enviado:', info.response);
    }
  });
}

module.exports = { enviarCorreoRecuperacion };
