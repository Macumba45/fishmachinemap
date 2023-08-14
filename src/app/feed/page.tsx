'use client'

import { FC, memo, useEffect } from 'react'
import { ContainerMenu, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import { feedUseLogic } from './logic'
import AccountMenu from '@/components/Menu'
import CircularIndeterminate from '@/components/Loader'
import { Avatar } from '@mui/material'

const Feed: FC = () => {
    const {
        getMarkersUser,
        fotosMarkers,
        fetchLikesMarkers,
        likedMarkers,
        loading,
    } = feedUseLogic()

    useEffect(() => {
        getMarkersUser()
    }, [getMarkersUser])

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
                <AccountMenu />
            </ContainerMenu>
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
                        />
                    )
                })}
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default memo(Feed)
