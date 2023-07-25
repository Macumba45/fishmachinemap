'use client'

import { FC, useEffect, useState } from 'react'
import { CardContainer, Container, MainContainer, NavBlabla } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'
import AccountMenu from '@/components/Menu'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import CardBlaBlaFish from '@/components/CardBlaBlaFish'
import CreateTripModal from '@/components/ModalBlaBlaFish'

const BlaBlaFish: FC = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <Container>
                <AccountMenu />
                <NavBlabla />
            </Container>
            <MainContainer>
                <CreateTripModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
                <CardContainer>
                    <CardBlaBlaFish />
                </CardContainer>
                <FloatAddBlaBlaFish onClick={() => setOpenModal(true)} />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default BlaBlaFish
