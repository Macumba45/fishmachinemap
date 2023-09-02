'use client'

import { FC, memo, useEffect } from 'react'
import ButtonComp from '../Button'
import VideoPlayer from '../VideoPlayer'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import LocaleSwitcher from '../LocaleSwitcher'
import {
    ButtonContainer,
    ContainerLanguage,
    MainContainer,
    SpanBold,
    SubtitleContainer,
    SubtitleHeader,
    TitleContainer,
    TitleHeader,
    VideoContainer,
} from './style'

const HeaderComp: FC = () => {
    const t = useTranslations('Index')
    const locale = useLocale() // Obtén el idioma actual utilizando useLocale
    const [currentLanguage, setCurrentLanguage] = React.useState(locale)

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
                <LocaleSwitcher setLanguage={setCurrentLanguage} />{' '}
                {/* Pasa setCurrentLanguage a LocaleSwitcher */}
            </ContainerLanguage>
            <TitleContainer>
                <TitleHeader>{t('HomeHeaderTitle')}</TitleHeader>
            </TitleContainer>
            <SubtitleContainer>
                <SubtitleHeader>
                    {t('homeSubHeaderTitle')}
                    <br /> <SpanBold>{t('homeSubHeaderTitle2')}</SpanBold>
                </SubtitleHeader>
            </SubtitleContainer>
            <ButtonContainer>
                <Link
                    style={{ textDecoration: 'none' }}
                    href={`${currentLanguage + '/auth/login'}`}
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
                    href={`${currentLanguage + '/auth/signup'}`}
                >
                    <ButtonComp
                        color="#00a5f2"
                        bgColor="white"
                        variant="contained"
                        title={t('register')}
                    />
                </Link>
                {/* <Link style={{ textDecoration: 'none' }} href="/maps">
                    <ContinueWithGoogleButton

                    />
                </Link> */}
                <Link
                    style={{ textDecoration: 'none' }}
                    href={`${currentLanguage + '/maps'}`}
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
                <VideoPlayer
                    url={
                        'https://res.cloudinary.com/dinasxwdf/video/upload/v1693586993/backgroundVideo_tgdz7p.mp4'
                    }
                />
            </VideoContainer>
        </MainContainer>
    )
}

export default memo(HeaderComp)
