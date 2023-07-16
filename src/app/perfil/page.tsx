'use client'

import React, { FC, useEffect } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'

const Profile: FC = () => {
    const { user, userMarkers, getUser, getUserMarkers } = useLogicUser()

    console.log(userMarkers)

    useEffect(() => {
        getUser()
        getUserMarkers()
    }, [])

    return (
        <>
            <MainContainer>
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default Profile
