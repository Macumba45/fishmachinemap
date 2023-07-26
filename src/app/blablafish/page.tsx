'use client'

import { FC, useEffect, useState } from 'react'
import {
    CardContainer,
    Container,
    MainContainer,
    NavBlabla,
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
            <ContainerMenu>
                <AccountMenu />
            </ContainerMenu>
            <MainContainer>
                <Container>
                    <TextNav>Conoce gente. Comparte Gastos</TextNav>
                </Container>

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
                                date={
                                    formattedDate.charAt(0).toUpperCase() +
                                    formattedDate.slice(1)
                                }
                                departureCity={
                                    item.departureCity.charAt(0).toUpperCase() +
                                    item.departureCity.slice(1)
                                }
                                arrivalCity={
                                    item.arrivalCity.charAt(0).toUpperCase() +
                                    item.arrivalCity.slice(1)
                                }
                                departureTime={
                                    item.departureTime.charAt(0).toUpperCase() +
                                    item.departureTime.slice(1)
                                }
                                description={
                                    item.description.charAt(0).toUpperCase() +
                                    item.description.slice(1)
                                }
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
