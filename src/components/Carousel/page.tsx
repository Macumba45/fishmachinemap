import React, { FC, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Picture {
    src: string
}

interface Props {
    pictures: Picture[]
}

const SimpleSlider: FC<Props> = ({ pictures }) => {
    const settings = {
        arrow: true,
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        style: {
            width: '100%',
            color: 'red',
            marginBottom: '1rem',
        },
    }

    useEffect(() => {
        // Aplica estilos personalizados a los dots después de que el componente se haya renderizado
        const dots = document.getElementsByClassName('slick-dots slick-thumb')
        if (dots.length > 0) {
            const dotList = dots[0] as HTMLElement
            // Aplica los estilos CSS personalizados
            dotList.style.backgroundColor = 'transparent'
            dotList.style.marginTop = '10px'
            dotList.style.marginBottom = '10px'
            // Agrega otros estilos según tus necesidades
        }
    }, [])

    return (
        <div style={{ width: '100%', borderRadius: '100px' }}>
            <Slider {...settings}>
                {pictures.map((picture, index) => {
                    return (
                        <div key={index} style={{ borderRadius: '10px' }}>
                            <img
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    borderRadius: '10px',
                                    marginBottom: '3rem',
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

export default SimpleSlider
