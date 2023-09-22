import IntroJs from 'intro.js'
import 'intro.js/introjs.css' // Estilo CSS de intro.js

export const introJs = () => {
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
                title: 'Filtra marcadores',
                element: '.filterButton',
                intro: 'Pulsa este botón para filtrar los marcadores',
                step: 3,
            },
            {
                title: 'Busca por la zona',
                element: '.buscarZona',
                intro: 'Pulsa este boton para traer los mejores resultados de Google Maps, como tiendas, o playas',
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
                title: '¡Disfruta de FishGram!',
                element: '.marker',
                intro: '!Buena pesca!',
                step: 8,
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
    })

    intro.start()
}
