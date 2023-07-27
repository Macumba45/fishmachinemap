'use client'

import { FC, useEffect, useState } from 'react'
import {
    CardContainer,
    Container,
    MainContainer,
    NoDataContainer,
    NoDataText,
    TextNav,
    ContainerMenu,
} from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import CardBlaBlaFish from '@/components/CardBlaBlaFish'
import PhishingIcon from '@mui/icons-material/Phishing'
import CreateTripModal from '@/components/ModalBlaBlaFish'
import { useLogicBlaBla } from './logic'
import { BlaBlaFish } from './type'

const BlaBlaFish: FC = () => {
    const { fetchBlaBlaFish, blaBlaFish } = useLogicBlaBla()
    const [openModal, setOpenModal] = useState(false)
    const currentDate = new Date()

    // Función de utilidad para formatear la fecha
    function formatDate(date: Date) {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        })
    }
    // Función de utilidad para capitalizar una cadena
    function capitalizeString(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        fetchBlaBlaFish()
    }, [])

    if (!blaBlaFish || blaBlaFish.length === 0) {
        return (
            <>
                <NoDataContainer>
                    <ContainerMenu>
                        <AccountMenu />
                    </ContainerMenu>
                    <Container>
                        <TextNav>Conoce, pesca. Comparte Gastos</TextNav>
                    </Container>
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
            <MainContainer>
                <ContainerMenu>
                    <AccountMenu />
                    <Container>
                        <TextNav>Conoce, pesca. Comparte Gastos</TextNav>
                    </Container>
                </ContainerMenu>

                <CreateTripModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />
                <CardContainer>
                    {blaBlaFish.map((item: BlaBlaFish) => {
                        const date = new Date(item.date)
                        // Si la fecha del item es anterior a la fecha actual, no renderizamos el componente
                        if (date < currentDate) {
                            return null
                        }
                        const formattedDate = formatDate(date)
                        const departureCity = capitalizeString(
                            item.departureCity
                        )
                        const arrivalCity = capitalizeString(item.arrivalCity)
                        const departureTime = capitalizeString(
                            item.departureTime
                        )
                        const description = capitalizeString(item.description)
                        return (
                            <CardBlaBlaFish
                                key={item.id}
                                date={formattedDate}
                                departureCity={departureCity}
                                arrivalCity={arrivalCity}
                                departureTime={departureTime}
                                description={description}
                                price={item.price}
                                phone={item.phone}
                                user={item.user?.name}
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
