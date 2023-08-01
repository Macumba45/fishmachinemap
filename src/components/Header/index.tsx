'use client'
import { FC, memo, useEffect } from 'react'
import ButtonComp from '../Button'
import {
    ButtonContainer,
    MainContainer,
    SpanBold,
    SubtitleContainer,
    SubtitleHeader,
    TitleContainer,
    TitleHeader,
    VideoContainer,
} from './style'
import VideoPlayer from '../VideoPlayer'
import Link from 'next/link'
import { useScrollBlock } from '@/hooks'

const HeaderComp: FC = () => {
    useEffect(() => {
        const handleScroll = (event: Event) => {
            event.preventDefault()
        }

        // Bloquear el desplazamiento cuando se monta el componente
        document.body.style.overflow = 'hidden'
        document.addEventListener('scroll', handleScroll, { passive: false })

        return () => {
            // Permitir el desplazamiento cuando se desmonta el componente
            document.body.style.overflow = ''
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <MainContainer>
            <TitleContainer>
                <TitleHeader>Bienvenido a FishApp</TitleHeader>
            </TitleContainer>
            <SubtitleContainer>
                <SubtitleHeader>
                    Una web de pescadores,
                    <br /> <SpanBold>creada para pescadores</SpanBold>
                </SubtitleHeader>
            </SubtitleContainer>
            <ButtonContainer>
                <Link style={{ textDecoration: 'none' }} href="/auth/login">
                    <ButtonComp
                        color="#00a5f2"
                        bgColor="white"
                        variant="contained"
                        title="Iniciar sesión"
                    />
                </Link>
                <Link style={{ textDecoration: 'none' }} href="/auth/signup">
                    <ButtonComp
                        color="#00a5f2"
                        bgColor="white"
                        variant="contained"
                        title="Registrarse"
                    />
                </Link>
            </ButtonContainer>
            <VideoContainer>
                <VideoPlayer url={'/video.mp4'} />
            </VideoContainer>
        </MainContainer>
    )
}

export default memo(HeaderComp)
