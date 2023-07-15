'use client'

import React, { FC } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'
import { get } from 'http'

const Profile: FC = () => {

    const { getUser } = useLogicUser()

    getUser()
    return (
        <>
            <MainContainer>
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default Profile
