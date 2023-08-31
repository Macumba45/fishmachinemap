'use client'

import { FC, memo, use, useEffect } from 'react'
import ButtonComp from '../Button'
import VideoPlayer from '../VideoPlayer'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import i18nConfig from '../../../i18n.mjs'
import useSetLanguage from '@/hooks/setLanguage'
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

const HeaderComp: FC = () => {
    const setLanguage = useSetLanguage();
    const { locales } = i18nConfig;
    console.log(locales)
    const { t } = useTranslation('common');
    console.log(useTranslation('common'))
    console.log(t('HomeHeaderTitle'))

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
                <TitleHeader>{t('HomeHeaderTitle')}</TitleHeader>
            </TitleContainer>
            <SubtitleContainer>
                <SubtitleHeader>
                    {t('homeSubHeaderTitle')}
                    <br /> <SpanBold>{t('homeSubHeaderTitle2')}</SpanBold>
                </SubtitleHeader>
            </SubtitleContainer>
            <ButtonContainer>
                <Link style={{ textDecoration: 'none' }} href="/auth/login">
                    <ButtonComp
                        color="#00a5f2"
                        bgColor="white"
                        variant="contained"
                        title={t('login')}
                    />
                </Link>
                <Link style={{ textDecoration: 'none' }} href="/auth/signup">
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
                <Link style={{ textDecoration: 'none' }} href="/maps">
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
                <VideoPlayer url={'/backgroundVideo.mp4'} />
            </VideoContainer>
            <button onClick={() => setLanguage('en')}>EN</button>
            <button onClick={() => setLanguage('es')}>ES</button>
        </MainContainer>
    )
}

export default memo(HeaderComp)
