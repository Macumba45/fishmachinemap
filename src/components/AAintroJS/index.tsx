import React, { useEffect } from 'react'
import IntroJs from 'intro.js'
import 'intro.js/introjs.css' // Estilo CSS de intro.js
import 'intro.js/themes/introjs-modern.css' // Tema moderno de intro.js
import { Modal } from '@mui/material'

const IntroTour = () => {
    const intro = IntroJs()

    console.log('intro', intro)

    useEffect(() => {
        intro.setOptions({
            steps: [
                {
                    element: '.menu', // Usar el nombre de la clase CSS sin el punto
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
            <Modal open={true}>
                <div>Holi</div>
            </Modal>
        </div>
    )
}

export default IntroTour
