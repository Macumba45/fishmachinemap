import React, { FC, useEffect } from 'react'
import IntroJs from 'intro.js'
import 'intro.js/introjs.css' // Estilo CSS de intro.js
import 'intro.js/themes/introjs-modern.css' // Tema moderno de intro.js
import { Modal } from '@mui/material'

const IntroTour: FC = () => {
    const intro = IntroJs()

    console.log('intro', intro)

    useEffect(() => {
        intro.setOptions({
            steps: [
                {
                    element: '.menu', // Usar el nombre de la clase CSS con un punto
                    intro: 'Este es el primer paso del tour.',
                },
                // Agrega más pasos según sea necesario
            ],
            showProgress: true,
            showBullets: true,
        })

        // Inicia el tour de introducción
        intro.start()
    }, [])

    return (
        <div>
            <p>¡Bienvenido al tutorial de introducción!</p>
            {/* El tutorial se ejecutará aquí */}
            <div>Holi</div>
            <p>Fin del tutorial.</p>
        </div>
    )
}

export default IntroTour
