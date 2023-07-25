'use client'

import { FC, use, useEffect, useState } from 'react'
import {
    CardContainer,
    Container,
    MainContainer,
    NavBlabla,
    NoDataContainer,
    NoDataText,
} from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import CardBlaBlaFish from '@/components/CardBlaBlaFish'
import PhishingIcon from '@mui/icons-material/Phishing'
import CreateTripModal from '@/components/ModalBlaBlaFish'
import { useLogicBlaBla } from './logic'
import { BlaBlaFish } from './type'
import { it } from 'node:test'

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
                <NoDataContainer>
                    <CreateTripModal
                        open={openModal}
                        onClose={() => {
                            setOpenModal(false)
                        }}
                    />
                    <PhishingIcon
                        sx={{
                            fontSize: '3rem',
                            color: '#49007a',
                            marginBottom: '2rem',
                        }}
                    />
                    <NoDataText>No hay viajes disponibles</NoDataText>
                    <FloatAddBlaBlaFish onClick={() => setOpenModal(true)} />
                    <SimpleBottomNavigation />
                </NoDataContainer>
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
                    {blaBlaFish.map((item: BlaBlaFish) => {
                        // Obtener la fecha en formato día-mes
                        const date = new Date(item.date)
                        const formattedDate = date.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                        })

                        return (
                            <CardBlaBlaFish
                                key={item.id}
                                date={formattedDate}
                                departureCity={item.departureCity}
                                arrivalCity={item.arrivalCity}
                                departureTime={item.departureTime}
                                returnTime={item.returnTime}
                                description={item.description}
                                price={item.price}
                                phone={item.phone}
                            />
                        )
                    })}
                </CardContainer>
                <FloatAddBlaBlaFish onClick={() => setOpenModal(true)} />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default BlaBlaFish
