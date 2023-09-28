'use client'

import { FC, memo, useEffect } from 'react'
import ButtonComp from '../Button'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import LocaleSwitcher from '../LocaleSwitcher'
import fishgram from '../../assets/fishgram.png'
import {
    ButtonContainer,
    ContainerLanguage,
    LogoPicture,
    MainContainer,
    SubtitleContainer,
    SubtitleHeader,
    TitleContainer,
    TitleHeader,
    VideoContainer,
} from './style'

const HeaderComp: FC = () => {
    const t = useTranslations('Index')
    const locale = useLocale() // Obtén el idioma actual utilizando useLocale

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
            <ContainerLanguage>
                <LocaleSwitcher />
            </ContainerLanguage>
            <TitleContainer>
                <meta
                    name="FishGram"
                    content="FishGram - ¡Comparte tus spots favoritos, capturas y mucho más!"
                />
                <TitleHeader aria-hidden="true" title="FishGram - ¡Comparte tus spots favoritos, capturas y mucho más!">
                    FishGram
                </TitleHeader>
                <LogoPicture alt="FishGram Logo" src={fishgram.src} />
            </TitleContainer>
            <SubtitleContainer>
                <SubtitleHeader>{t('homeSubHeaderTitle')}</SubtitleHeader>
            </SubtitleContainer>
            <ButtonContainer>
                <Link
                    style={{ textDecoration: 'none' }}
                    href={`${locale + '/auth/login'}`}
                >
                    <ButtonComp
                        color="#00a5f2"
                        bgColor="white"
                        variant="contained"
                        title={t('login')}
                    />
                </Link>
                <Link
                    style={{ textDecoration: 'none' }}
                    href={`${locale + '/auth/signup'}`}
                >
                    <ButtonComp
                        color="#00a5f2"
                        bgColor="white"
                        variant="contained"
                        title={t('register')}
                    />
                </Link>
                <Link
                    style={{ textDecoration: 'none' }}
                    href={`${locale + '/maps'}`}
                >
                    <ButtonComp
                        color="white"
                        variant="outlined"
                        bgColor="transparent"
                        border="1px solid white"
                        title={t('guest')}
                    />
                </Link>
            </ButtonContainer>
            <VideoContainer>
                {/* <VideoPlayer
                    url={
                        'https://res.cloudinary.com/dinasxwdf/video/upload/v1693586993/backgroundVideo_tgdz7p.mp4'
                    }
                /> */}
            </VideoContainer>
        </MainContainer>
    )
}

export default memo(HeaderComp)
