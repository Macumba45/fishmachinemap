'use client'

import { FC, useEffect, useState, memo } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import CardBlaBlaFish from '@/components/CardBlaBlaFish'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import CreateTripModal from '@/components/ModalBlaBlaFish'
import { useLogicBlaBla } from './logic'
import { BlaBlaFish } from './type'
import CircularIndeterminate from '@/components/Loader'
import { Avatar } from '@mui/material'
import FloatLoginButton from '@/components/FloatLoginButton'
import { useRouter } from 'next/navigation'
import {
    CardContainer,
    Container,
    MainContainer,
    NoDataContainer,
    NoDataText,
    TextNav,
    ContainerMenu,
} from './style'

const BlaBlaFish: FC = () => {
    const {
        fetchBlaBlaFish,
        blaBlaFish,
        loading,
        dataBlablaUser,
        getUserInfo,
    } = useLogicBlaBla()
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const currentDate = new Date()
    const todosHanPasadoDeFecha = blaBlaFish.every(viaje => {
        const viajeDate = new Date(viaje.date)
        // Verifica si la fecha del viaje es menor o igual a la fecha actual
        return viajeDate < currentDate
    })

    const goToLogin = () => {
        router.push('/auth/login')
    }

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
        getUserInfo()
    }, [])

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [])

    if (loading) {
        return (
            <>
                <CircularIndeterminate />
                <SimpleBottomNavigation />
            </>
        )
    }

    if (todosHanPasadoDeFecha) {
        return (
            <>
                <NoDataContainer>
                    <ContainerMenu>
                        <AccountMenu userPicture={dataBlablaUser?.picture} />
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
                    <AirportShuttleIcon
                        sx={{
                            fontSize: '3rem',
                            color: '#49007a',
                            marginBottom: '2rem',
                        }}
                    />
                    <NoDataText>No hay viajes disponibles</NoDataText>
                    <FloatAddBlaBlaFish
                        title="Añadir viaje"
                        onClick={() => setOpenModal(true)}
                        disabled={!isLogged}
                    />
                    <FloatLoginButton
                        disabled={isLogged}
                        title="Iniciar Sesión"
                        onClick={() => {
                            goToLogin()
                        }}
                        style={{
                            position: 'fixed',
                            bottom: '5.3rem',
                            left: '1rem',
                            display: isLogged ? 'none' : 'flex',
                        }}
                    />
                    <SimpleBottomNavigation />
                </NoDataContainer>
            </>
        )
    }

    return (
        <>
            <MainContainer>
                <ContainerMenu>
                    <AccountMenu userPicture={dataBlablaUser?.picture} />
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
                                iconCreator={
                                    <Avatar
                                        src={item.user?.picture}
                                        sx={{
                                            width: '19.2px',
                                            height: '19.2px',
                                            marginRight: '0.5rem',
                                        }}
                                    />
                                }
                            />
                        )
                    })}
                </CardContainer>
                <FloatAddBlaBlaFish
                    title="Añadir viaje"
                    onClick={() => setOpenModal(true)}
                    disabled={!isLogged}
                />
                <FloatLoginButton
                    disabled={isLogged}
                    title="Iniciar Sesión"
                    onClick={() => {
                        goToLogin()
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '5.3rem',
                        left: '1rem',
                        display: isLogged ? 'none' : 'flex',
                    }}
                />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(BlaBlaFish)
