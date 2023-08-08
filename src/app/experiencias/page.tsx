'use client'

import React, { FC, memo } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'

const Experiencias: FC = () => {
    return (
        <>
            <MainContainer>
                <AccountMenu />

                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
