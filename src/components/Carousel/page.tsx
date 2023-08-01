import React, { FC, memo, useEffect } from 'react'
import Slider, { CustomArrowProps } from 'react-slick'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Picture {
    src: string
}

interface Props {
    pictures?: Picture[]
}

const SimpleSlider: FC<Props> = ({ pictures }) => {
    const arrowStyle: CustomArrowProps = {
        style: {
            color: 'black',
            fontSize: '4rem',
        },
    }

    const settings = {
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        style: {
            width: '100%',
            color: 'red',
            marginBottom: '1rem',
        },
        slickslide: {},
        fade: true,
        autoplay: true,
        prevArrow: <NavigateBeforeIcon style={arrowStyle.style} />,
        nextArrow: <NavigateNextIcon style={arrowStyle.style} />,
    }

    useEffect(() => {
        // Aplica estilos personalizados a los dots después de que el componente se haya renderizado
        const dots = document.getElementsByClassName('slick-dots slick-thumb')
        const nextArrow = document.getElementsByClassName(
            'slick-arrow slick-next'
        )
        const prevArrow = document.getElementsByClassName(
            'slick-arrow slick-prev'
        )
        if (dots.length > 0) {
            const dotList = dots[0] as HTMLElement
            // Aplica los estilos CSS personalizados
            dotList.style.color = 'black'
            dotList.style.marginTop = '10px'
            dotList.style.marginBottom = '10px'
            // Agrega otros estilos según tus necesidades
        }
        if (nextArrow.length > 0 && prevArrow.length > 0) {
            const nextArrowIcon = nextArrow[0] as HTMLElement
            const prevArrowIcon = prevArrow[0] as HTMLElement
            // Aplica los estilos CSS personalizados al icono de siguiente
            nextArrowIcon.style.color = '#49007a'
            prevArrowIcon.style.color = '#49007a'

            // Agrega otros estilos según tus necesidades
        }
    }, [])

    return (
        <div style={{ width: '100%', borderRadius: '100px' }}>
            <Slider {...settings}>
                {pictures?.map((picture, index) => {
                    return (
                        <div key={index} style={{ borderRadius: '10px' }}>
                            <img
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    borderRadius: '10px',
                                    marginBottom: '1rem',
                                }}
                                src={picture.src}
                                alt=""
                            />
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default memo(SimpleSlider)
