import IntroJs from 'intro.js'
import 'intro.js/introjs.css' // Estilo CSS de intro.js

export const introJs = () => {
    const isLogged = window.localStorage.getItem('token')

    const intro = IntroJs()

    intro.setOptions({
        steps: [
            {
                title: '¡FishGram!',
                intro: 'Descubre los mejores lugares para pescar',
                step: 1,
            },

            {
                title: '!El menú!',
                element: '.menu',
                intro: 'Aquí puedes visitar tu perfil, ver la meteorología y más',
                step: 2,
                position: 'right',
            },
            {
                title: '¡Filtra marcadores!',
                element: '.filterButton',
                intro: 'Pulsa este botón para filtrar los marcadores',
                step: 3,
            },
            isLogged
                ? {
                    title: '¡Busca por la zona!',
                    element: '.buscarZona',
                    intro: 'Pulsa este boton para traer los mejores resultados de Google Maps, como tiendas, o playas',
                    step: 4,
                }
                : {
                    title: '¡Inicia sesión!',
                    element: '.login',
                    intro: 'Pulsa este botón para iniciar sesión y disfrutar de FishGram',
                    step: 4,
                },
            {
                title: '¡Últimos marcadores!',
                element: '.badge',
                intro: 'Aquí puedes ver los marcadores nuevos',
                step: 5,
            },
            {
                title: '!Cambia el color del mapa!',
                element: '.switch',
                intro: 'Pulsa este botón para cambiar el color del mapa',
                step: 6,
            },
            {
                title: '¡Añade un marcador!',
                element: '.addMarker',
                intro: 'Pulsa este botón para añadir un marcador',
                step: 7,
            },
            {
                title: '¡Sección mapas!',
                element: '.maps',
                intro: 'Aquí puedes ver los marcadores de los usuarios',
                step: 8,
            },
            {
                title: '¡Sección Feed!',
                element: '.feed',
                intro: 'Aquí puedes ver los marcadores de los usuarios al estilo Instagram',
                step: 9,
            },
            {
                title: '¡Sección Experiencias!',
                element: '.experiencias',
                intro: 'Compra, disfruta de la mejores expereincias de pesca',
                step: 10,
            },
            {
                title: '¡Sección BlaBlaFish!',
                element: '.blablafish',
                intro: 'Comparte viaje con otros pescadores y conoce gente nueva',
                step: 11,
            },
            {
                title: '¡Sección Tiendas!',
                element: '.store',
                intro: 'Compra, vende y cambia material de pesca',
                step: 12,
            },
            {
                title: '¡Disfruta de FishGram!',
                element: '.marker',
                intro: '!Buena pesca!',
                step: 13,
            },

            // Agrega más pasos según sea necesario
        ],
        showBullets: true,
        exitOnOverlayClick: false, // Evita que se cierre el tutorial haciendo clic en el fondo
        dontShowAgain: true,
        prevLabel: 'Anterior',
        nextLabel: 'Siguiente',
        buttonClass: 'buttonSteps',
        dontShowAgainLabel: 'No volver a mostrar',
        dontShowAgainCookie: 'introjs-map',
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
