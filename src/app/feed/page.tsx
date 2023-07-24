'use client'

import { FC, useEffect, useState } from 'react'
import { ContainerMenu, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import { feedUseLogic } from './logic'
import AccountMenu from '@/components/Menu'

const Feed: FC = () => {
    const { getMarkersUser, fotosMarkers, fetchLikesMarkers } = feedUseLogic()
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScroll = () => {
        const position = window.scrollY
        setScrollPosition(position)
    }

    // Esta función se llamará cuando el usuario llegue al final de la página.
    const loadMoreData = () => {
        // Aquí puedes cargar más datos desde tu API o realizar alguna acción adicional.
        // console.log('Cargando más datos...')
    }

    useEffect(() => {
        // Verificar si el usuario llegó al final de la página (por ejemplo, 200px antes del fondo).
        const isAtBottom =
            window.innerHeight + scrollPosition >=
            document.body.offsetHeight - 200

        if (isAtBottom) {
            loadMoreData()
        }
    }, [scrollPosition])

    useEffect(() => {
        getMarkersUser()
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <ContainerMenu>
                <AccountMenu />
            </ContainerMenu>
            <MainContainer>
                {fotosMarkers.map(item => (
                    <CardFeed
                        key={item.id}
                        id={item.id}
                        description={item.description}
                        picture={item.picture}
                        onClick={() => fetchLikesMarkers(item.id)}
                    />
                ))}
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default Feed
