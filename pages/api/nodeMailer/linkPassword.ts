import nodemailer from 'nodemailer'

export const sendLinkPasswordRecovery = async (email: string, link: string) => {
    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        // Configuración del servicio de correo electrónico (por ejemplo, Gmail)
        service: 'Gmail',
        auth: {
            user: 'gonzalolovo@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
    })

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log('Server is ready to take our messages')
                resolve(success)
            }
        })
    })

    // Configurar el contenido del correo electrónico
    const mailOptions = {
        from: 'gonzalolovo@gmail.com',
        to: email,
        subject: 'Restablecer contraseña - FishGram',
        text: `Aquí tienes el enlace para restablecer tu contraseña: ${link}`,
    }

    // Enviar el correo electrónico
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error)
                reject(error)
            } else {
                resolve(info)
            }
        })
    })
}
