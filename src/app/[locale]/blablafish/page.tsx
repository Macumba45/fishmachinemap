'use client'

import { FC, useEffect, memo } from 'react'
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
import logo from '../../../assets/fishgram.png'
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
        isLogged,
        setIsLogged,
        openModal,
        setOpenModal,
        todosHanPasadoDeFecha,
        currentDate,
        formatDate,
        capitalizeString,
        goToLogin,
        dynamicTitle
    } = useLogicBlaBla()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [setIsLogged])

    useEffect(() => {
        fetchBlaBlaFish()
        getUserInfo()
    }, [getUserInfo, fetchBlaBlaFish])


    // Actualiza el título cuando el componente se monta
    useEffect(() => {
        document.title = dynamicTitle
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
                        <TextNav src={logo.src} />
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
                            color: '#4675A6',
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
                </ContainerMenu>
                <Container>
                    <TextNav src={logo.src} />
                </Container>
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
                                userId={item.user?.id}
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
