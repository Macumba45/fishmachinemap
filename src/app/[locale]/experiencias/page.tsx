'use client'

import { FC, memo, useEffect, useState } from 'react'
import { useLogicExperience } from './logic'
import { Experiences } from './type'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FilterExperiencias from '@/components/FilterExperiencias'
import CardExperiences from '@/components/CardExperiences'
import FloatAddExperiences from '@/components/FloatAddExperiences'
import ExperienceModal from '@/components/ModalAddExperiences'
import CircularIndeterminate from '@/components/Loader'
import { Button, Typography } from '@mui/material'
import logo from '../../../assets/fishgram.png'
import {
    CardContainer,
    Container,
    ContainerInFluencer,
    ContainerMenu,
    FilterContainer,
    MainContainer,
    TextNav,
} from './style'

const Experiencias: FC = () => {
    const { currentUser, getUserInfo, getExperiences, experiences, loading } =
        useLogicExperience()
    const [selectedCategory, setSelectedCategory] =
        useState<string>('Influencers')
    const [filteredData, setFilteredData] = useState<Experiences[]>([])
    const [openModal, setOpenModal] = useState(false)
    const isInfluencer = currentUser?.role === 'INFLUENCER'
    useEffect(() => {
        getUserInfo()
        getExperiences()
    }, [])

    const filterByCategory = (selectedCategory: string) => {
        if (selectedCategory === 'Influencers') {
            setSelectedCategory('Influencers') // Update the selected category
            // setFilteredData(store) // Si el valor seleccionado es "all", entonces mostrar todos los datos
            return
        }
        setSelectedCategory(selectedCategory) // Update the selected category
        // const filteredData = store.filter(
        //     (item: any) => item.category === selectedCategory
        // )
        setFilteredData(filteredData)
    }

    const sendUsEmail = () => {
        window.open('mailto:gonzalolovo@gmailcom')
    }

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
            <MainContainer>
                <ContainerMenu>
                    <AccountMenu userPicture={currentUser?.picture} />
                </ContainerMenu>
                <Container>
                    <TextNav src={logo.src} />
                </Container>
                <FilterContainer>
                    <FilterExperiencias
                        value={selectedCategory}
                        onChange={filterByCategory}
                    />
                </FilterContainer>
                {!isInfluencer && (
                    <ContainerInFluencer>
                        <Typography variant="body1">
                            ¿Eres Influencer?
                        </Typography>
                        <Button
                            sx={{ color: '#4675A6' }}
                            onClick={() => sendUsEmail()}
                        >
                            ¡Envíanos un email!
                        </Button>
                    </ContainerInFluencer>
                )}
                <CardContainer
                    style={{ marginTop: !isInfluencer ? '1rem' : '6rem' }}
                >
                    {experiences.map((item: any) => {
                        return (
                            <CardExperiences
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                picture={item.picture}
                                category={item.category}
                                price={item.price}
                                city={item.city}
                                country={item.country}
                                whatsapp={item.whatsapp}
                                influencer={item.user.name}
                                userPicture={item.user.picture}
                                userId={item.user.id}
                            />
                        )
                    })}
                    {isInfluencer && (
                        <FloatAddExperiences
                            title="Añadir Experiencia"
                            onClick={() => setOpenModal(true)}
                        />
                    )}
                    <ExperienceModal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                    />
                </CardContainer>
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
