import nodemailer from 'nodemailer'

export const sendEmailNewUser = async (email: string) => {
    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        // Configuración del servicio de correo electrónico (por ejemplo, Gmail)
        service: 'Gmail',
        auth: {
            user: 'gonzalolovo@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    // Configurar el contenido del correo electrónico
    const mailOptions = {
        from: 'gonzalolovo@gmail.com',
        to: email,
        subject: 'Registro exitoso',
        text: '¡Gracias por registrarte en nuestro sitio!',
    }

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error)
        } else {
            console.log('Correo electrónico enviado:', info.response)
        }
    })
}
