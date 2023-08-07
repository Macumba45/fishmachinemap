'use client'

import React, { FC, useEffect, memo } from 'react'
import { Container, ContainerMenu, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import TitlebarImageList from '@/components/StoreImageList'
import { TextNav } from '../blablafish/style'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'

const Experiencias: FC = () => {
    return (
        <>
            <ContainerMenu>
                <AccountMenu />
            </ContainerMenu>
            <Container>
                <TextNav>Compra y vende</TextNav>
            </Container>
            <MainContainer>
                <TitlebarImageList />
                <FloatAddBlaBlaFish />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
