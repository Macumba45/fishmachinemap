'use client'

import { FC } from 'react'
import ButtonComp from '../Button'
import { ButtonContainer, MainContainer, SpanBold, SubtitleContainer, SubtitleHeader, TitleContainer, TitleHeader, VideoContainer } from './style'
import { Props } from './types'
import VideoPlayer from '../VideoPlayer'
import Link from 'next/link'
const HeaderComp: FC = () => {
    return (
        <MainContainer>
            <TitleContainer>
                <TitleHeader>
                    Bienvenido a FishApp
                </TitleHeader>
            </TitleContainer>
            <SubtitleContainer>
                <SubtitleHeader>
                    Una web de pescadores,<br /> <SpanBold>creada para pescadores</SpanBold>
                </SubtitleHeader>
            </SubtitleContainer>
            <ButtonContainer>
                <Link style={{ textDecoration: 'none' }} href='/auth/login'>
                    <ButtonComp color='#00a5f2' bgColor='white' variant='contained' title='Iniciar sesión' />
                </Link>
                <Link style={{ textDecoration: 'none' }} href='/auth/signup'>
                    <ButtonComp color='#00a5f2' bgColor='white' variant='contained' title='Registrarse' />
                </Link>

            </ButtonContainer>
            <VideoContainer>
                <VideoPlayer url={'/video.mp4'} />
            </VideoContainer>
        </MainContainer>
    )
}

export default HeaderComp
