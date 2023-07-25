'use client'

import { FC, use, useEffect, useState } from 'react'
import { CardContainer, Container, MainContainer, NavBlabla } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import CardBlaBlaFish from '@/components/CardBlaBlaFish'
import CreateTripModal from '@/components/ModalBlaBlaFish'
import { useLogicBlaBla } from './logic'
import { BlaBlaFish } from './type'

interface Props {
    blaBlaFish?: BlaBlaFish[] // Define blaBlaFish como una matriz de BlaBlaFish o como undefined (opcional)
}

const BlaBlaFish: FC = () => {
    const { fetchBlaBlaFish, blaBlaFish } = useLogicBlaBla()
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchBlaBlaFish()
    }, [])

    if (!blaBlaFish || blaBlaFish.length === 0) {
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
                    <p>No hay datos</p>
                    <FloatAddBlaBlaFish onClick={() => setOpenModal(true)} />
                    <SimpleBottomNavigation />
                </MainContainer>
            </>
        )
    }

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
                    {blaBlaFish.map((item: BlaBlaFish) => (
                        <CardBlaBlaFish
                            key={item.id}
                            departureCity={item.departureCity}
                            arrivalCity={item.arrivalCity}
                            departureTime={item.departureTime}
                            returnTime={item.returnTime}
                            description={item.description}
                            price={item.price}
                            phone={item.phone}
                        />
                    ))}
                </CardContainer>
                <FloatAddBlaBlaFish onClick={() => setOpenModal(true)} />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default BlaBlaFish
