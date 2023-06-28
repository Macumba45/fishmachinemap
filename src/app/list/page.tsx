'use client'

import { FC, memo } from 'react'
import { MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'

const GoogleMapComp: FC = () => {
    return (
        <>
            <MainContainer>
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(GoogleMapComp)
