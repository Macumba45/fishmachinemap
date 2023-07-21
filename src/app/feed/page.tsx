'use client'

import { FC, useEffect } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import { feedUseLogic } from './logic'

const Feed: FC = () => {
    const { getMarkersUser, fotosMarkers } = feedUseLogic()

    useEffect(() => {
        getMarkersUser()
    }, [])

    return (
        <>
            <MainContainer>
                {fotosMarkers.map(item => (
                    <CardFeed
                        key={item.id}
                        id={item.id}
                        description={item.description}
                        picture={item.picture}
                    />
                ))}
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default Feed
