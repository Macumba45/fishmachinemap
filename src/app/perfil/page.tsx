'use client'

import React, { FC } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'

const Profile: FC = () => {
    return (
        <>
            <MainContainer>
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default Profile
