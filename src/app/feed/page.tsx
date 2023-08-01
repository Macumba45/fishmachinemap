'use client'

import { FC, memo, useEffect, useState } from 'react'
import { ContainerMenu, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import { feedUseLogic } from './logic'
import AccountMenu from '@/components/Menu'
import CircularIndeterminate from '@/components/Loader'

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
        return <CircularIndeterminate />
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
                            id={item.id}
                            description={item.description}
                            picture={item.picture}
                            onClick={() =>
                                fetchLikesMarkers(item.id, item.userId)
                            }
                            likes={item.likes.length}
                            isLiked={likedMarkers[item.id] || false}
                            user={item.user}
                            date={fechaCreacion.toLocaleString('es-ES', {
                                month: 'numeric',
                                day: 'numeric',
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
