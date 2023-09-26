'use client'

import { FC, useEffect, memo, useState } from 'react'
import { useLogicStore } from './logic'
import { Store } from './type'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { Typography } from '@mui/material'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import TitlebarImageList from '@/components/StoreImageList'
import FloatAddBlaBlaFish from '@/components/FloatAddBlaBlaFish'
import StoreModal from '@/components/ModalStore'
import CircularIndeterminate from '@/components/Loader'
import FloatLoginButton from '@/components/FloatLoginButton'
import LimitTags from '@/components/FilterStore'
import { useRouter } from 'next/navigation'
import logo from '../../../assets/fishgram.png'
import {
    Container,
    ContainerMenu,
    FilterContainer,
    MainContainer,
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

    const [filteredData, setFilteredData] = useState<Store[]>(store)
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos') // Establecer el valor predeterminado como "Todos"
    const locale = useLocale() // Obtén el idioma actual utilizando useLocale
    const router = useRouter()

    const goToLogin = () => {
        router.push(`/${locale}/auth/login`)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const filterByCategory = (selectedCategory: string) => {
        if (selectedCategory === 'Todos') {
            setSelectedCategory('Todos') // Update the selected category
            setFilteredData(store) // Si el valor seleccionado es "all", entonces mostrar todos los datos
            return
        }
        setSelectedCategory(selectedCategory) // Update the selected category
        const filteredData = store.filter(
            (item: any) => item.category === selectedCategory
        )
        setFilteredData(filteredData)
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

    useEffect(() => {
        setFilteredData(store)
    }, [store])

    // Define el título dinámico
    const dynamicTitle = 'FishGram - Store'

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
    return (
        <>
            <ContainerMenu>
                <AccountMenu userPicture={dataStoreUser?.picture} />
            </ContainerMenu>
            <Container>
                <TextNav src={logo.src} />
            </Container>
            <FilterContainer>
                <LimitTags
                    value={selectedCategory}
                    onChange={filterByCategory}
                />
            </FilterContainer>
            <MainContainer>
                {filteredData.length === 0 ? (
                    <Typography>No hay productos en esta categoría</Typography>
                ) : (
                    filteredData.map(item => (
                        <Link
                            key={item.id}
                            href={`/${locale}/store/${item.id}`}
                        >
                            <TitlebarImageList
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                picture={item.picture}
                                price={item.price}
                            />
                        </Link>
                    ))
                )}

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
