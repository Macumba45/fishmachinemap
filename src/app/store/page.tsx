'use client'

import React, { FC, useEffect, memo, useState } from 'react'
import { Container, ContainerMenu, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import TitlebarImageList from '@/components/StoreImageList'
import { TextNav } from '../blablafish/style'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import StoreModal from '@/components/ModalStore'
import { useLogicStore } from './logic'

const Experiencias: FC = () => {
    const { open, setOpen } = useLogicStore()

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <ContainerMenu>
                <AccountMenu />
            </ContainerMenu>
            <Container>
                <TextNav>Compra y vende</TextNav>
            </Container>
            <MainContainer>
                <StoreModal open={open} onClose={() => handleClose()} />
                <TitlebarImageList />
                <FloatAddBlaBlaFish onClick={() => handleOpen()} />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
