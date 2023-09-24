import { BorderColor } from '@mui/icons-material'
import IntroJs from 'intro.js'
import 'intro.js/introjs.css' // Estilo CSS de intro.js

export const introJs = () => {
    const intro = IntroJs()

    intro.setOptions({
        steps: [
            {
                title: '¡Bienvenido al Feed!',
                intro: 'Todos los marcadores están aquí',
                step: 1,
            },

            {
                title: '¡Dale likes!',
                element: '.heart',
                intro: 'Dale likes a los marcadores que te gusten',
                step: 2,
            },
            {
                title: '¡Comenta los marcadores!',
                element: '.comment',
                intro: 'Comenta los marcadores que te gusten',
                step: 3,
            },
            {
                title: '¡Comparte los marcadores!',
                element: '.share',
                intro: 'Comparte los marcadores que te gusten',
                step: 4,
            },
            {
                title: '¡Visita el perfil!',
                element: '.profile',
                intro: 'Visita el perfil de los usuarios',
                step: 5,
            },
            {
                title: '!Disfruta de FishGram!',
                intro: '¡Buena pesca!',
                step: 6,
            },

            // Agrega más pasos según sea necesario
        ],
        showBullets: true,
        exitOnOverlayClick: false, // Evita que se cierre el tutorial haciendo clic en el fondo
        dontShowAgain: true,
        prevLabel: 'Anterior',
        nextLabel: 'Siguiente',
        dontShowAgainLabel: 'No volver a mostrar',
        buttonClass: 'buttonSteps',
        dontShowAgainCookie: 'introjs-feed',
        doneLabel: 'Finalizar',
    })

    intro.onafterchange(() => {
        const tooltipContainer = document.querySelector(
            '.introjs-tooltip-title'
        )
        tooltipContainer?.setAttribute(
            'style',
            'color: #4675A6; font-size: 18px;'
        )
        const arrows = document.querySelectorAll('.introjs-arrow')
        arrows.forEach((arrow: any) => {
            arrow.style.border = 'none'
        })
        const buttosStyles = document.querySelectorAll('.buttonSteps')
        buttosStyles.forEach((button: any) => {
            button.style.backgroundColor = '#4675A6'
            button.style.color = '#fff'
            button.style.border = 'none'
            button.style.borderRadius = '5px'
            button.style.padding = '10px'
            button.style.margin = '10px'
            button.style.cursor = 'pointer'
        })
        const bulletsIntro = document.querySelectorAll('.introjs-bullets')

        bulletsIntro.forEach(bulletContainer => {
            const bulletList = bulletContainer.querySelectorAll('a')

            bulletList.forEach(bullet => {
                bullet.style.background = '#4675A6'
            })
        })
    })

    intro.start()
}
