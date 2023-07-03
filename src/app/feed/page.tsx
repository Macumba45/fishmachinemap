'use client'

import { FC } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardFeed from '@/components/CardFeed'
import { objetos } from './data'

const Feed: FC = () => {
    console.log(objetos)

    return (
        <>
            <MainContainer>
                <CardFeed />
                <CardFeed />
                <CardFeed />
                <CardFeed />
                <CardFeed />
                <CardFeed />
                <CardFeed />
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default Feed
