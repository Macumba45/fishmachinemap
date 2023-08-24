'use client'

import { FC, memo, useEffect, useState } from 'react'
import { feedUseLogic } from './logic'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import AccountMenu from '@/components/Menu'
import CircularIndeterminate from '@/components/Loader'
import { Avatar } from '@mui/material'
import { Container, ContainerMenu, MainContainer, TextNav } from './style'
import FloatLoginButton from '@/components/FloatLoginButton'
import { useRouter } from 'next/navigation'

const Feed: FC = () => {
    const {
        getMarkersUser,
        fotosMarkers,
        fetchLikesMarkers,
        likedMarkers,
        loading,
        getUserInfo,
        dataFeedUser,
    } = feedUseLogic()

    const router = useRouter()

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [])

    const handleShareOnFacebook = (userId: string) => {
        const feedUrl = `https://fishgramapp.vercel.app/feed/${userId}` // Reemplaza con la URL real del feed
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            feedUrl
        )}`
        window.open(url, '_blank')
    }

    const handleShareOnWhatsApp = (userId: string) => {
        const feedUrl = `https://fishgramapp.vercel.app/feed/${userId}` // Reemplaza con la URL real del feed
        const url = `https://wa.me/?text=${encodeURIComponent(feedUrl)}`
        window.open(url, '_blank')
    }

    const goToLogin = () => {
        router.push('/auth/login')
    }

    useEffect(() => {
        getMarkersUser()
    }, [getMarkersUser])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

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
                <TextNav>Marcadores Recientes</TextNav>
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
                            onClick={() =>
                                fetchLikesMarkers(item.id, item.userId)
                            }
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
