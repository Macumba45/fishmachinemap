'use client'

import { FC, memo, useEffect } from 'react'
import { introJs } from './intro'
import { useFeedLogic } from './logic'
import FloatLoginButton from '@/components/FloatLoginButton'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import AccountMenu from '@/components/Menu'
import CircularIndeterminate from '@/components/Loader'
import { Avatar } from '@mui/material'
import logo from '../../../assets/fishgram.png'
import { Container, ContainerMenu, MainContainer, TextNav } from './style'

const Feed: FC = () => {
    const {
        getMarkersUser,
        fotosMarkers,
        fetchLikesMarkers,
        likedMarkers,
        loading,
        getUserInfo,
        dataFeedUser,
        dynamicTitle,
        isLogged,
        setIsLogged,
        handleShareOnFacebook,
        handleShareOnWhatsApp,
        goToLogin,
    } = useFeedLogic()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [setIsLogged])

    useEffect(() => {
        getMarkersUser()
    }, [getMarkersUser])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    useEffect(() => {
        if (!loading) {
            introJs()
        }
    }, [loading])

    // Actualiza el título cuando el componente se monta
    useEffect(() => {
        document.title = dynamicTitle
    }, [dynamicTitle])

    // Renderiza el componen

    if (loading) {
        return (
            <>
                <CircularIndeterminate />
                <SimpleBottomNavigation />
            </>
        )
    }

    return (
        <>
            <ContainerMenu>
                <AccountMenu userPicture={dataFeedUser?.picture} />
            </ContainerMenu>
            <Container>
                <TextNav src={logo.src} />
            </Container>
            <MainContainer>
                {fotosMarkers.map(item => {
                    const fechaCreacion = new Date(item.createdAt)
                    return (
                        <CardFeed
                            key={item.id}
                            iconCreator={
                                <Avatar
                                    src={item.user.picture}
                                    sx={{
                                        width: 25,
                                        height: 25,
                                        marginRight: '0.5rem',
                                    }}
                                />
                            }
                            id={item.id}
                            description={item.description}
                            picture={item.picture}
                            onClick={() => fetchLikesMarkers(item.id)}
                            likes={item.likes.length}
                            isLiked={likedMarkers[item.id] || false}
                            numberOfComments={item.comments.length}
                            user={item.user}
                            date={fechaCreacion.toLocaleString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                            })}
                            handleShareOnWhatsApp={() =>
                                handleShareOnWhatsApp(item.userId)
                            }
                            handleShareOnFacebook={() =>
                                handleShareOnFacebook(item.userId)
                            }
                        />
                    )
                })}
                <FloatLoginButton
                    disabled={isLogged}
                    title="Iniciar Sesión"
                    onClick={() => {
                        goToLogin()
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '5.3rem',
                        left: '1rem',
                        display: isLogged ? 'none' : 'flex',
                    }}
                />
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default memo(Feed)
