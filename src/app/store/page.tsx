'use client'

import React, { FC, useEffect, memo, useState } from 'react'
import { useLogicStore } from './logic'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import TitlebarImageList from '@/components/StoreImageList'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import StoreModal from '@/components/ModalStore'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import CircularIndeterminate from '@/components/Loader'
import Link from 'next/link'
import FloatLoginButton from '@/components/FloatLoginButton'
import { useRouter } from 'next/navigation'
import {
    Container,
    ContainerMenu,
    MainContainer,
    MainContainerNoData,
    NoDataText,
    TextNav,
} from './style'

const Store: FC = () => {
    const {
        open,
        setOpen,
        fetchStore,
        store,
        loading,
        dataStoreUser,
        getUserInfo,
    } = useLogicStore()

    const router = useRouter()

    const goToLogin = () => {
        router.push('/auth/login')
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        fetchStore()
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

    if (store.length === 0 && !loading) {
        return (
            <>
                <ContainerMenu>
                    <AccountMenu userPicture={dataStoreUser?.picture} />
                </ContainerMenu>
                <Container>
                    <TextNav>Compra, vende. Reutiliza</TextNav>
                </Container>
                <MainContainerNoData>
                    <ShoppingBagIcon
                        sx={{
                            fontSize: '3rem',
                            color: '#49007a',
                            marginBottom: '2rem',
                        }}
                    />

                    <NoDataText>No hay productos a la venta</NoDataText>
                </MainContainerNoData>
                <StoreModal open={open} onClose={() => handleClose()} />
                <FloatAddBlaBlaFish
                    title="Añadir producto"
                    onClick={handleOpen}
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
            </>
        )
    }
    return (
        <>
            <ContainerMenu>
                <AccountMenu userPicture={dataStoreUser?.picture} />
            </ContainerMenu>
            <Container>
                <TextNav>Compra, vende. Reutiliza</TextNav>
            </Container>
            <MainContainer>
                {store.map(item => (
                    <Link key={item.id} href={`/store/${item.id}`}>
                        <TitlebarImageList
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            picture={item.picture}
                            price={item.price}
                        />
                    </Link>
                ))}

                <FloatAddBlaBlaFish
                    title="Añadir producto"
                    onClick={handleOpen}
                    disabled={!isLogged}
                />
                <StoreModal open={open} onClose={() => handleClose()} />
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

export default memo(Store)
