'use client'

import React, { FC, useEffect } from 'react'
import { CardContainer, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardList from '@/components/CardList'
import { shopsListID, objetosFeed } from './data'
import CardFeed from '@/components/CardFeed'
import { useScrollBlock } from '@/hooks'

const Feed: FC = () => {




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
