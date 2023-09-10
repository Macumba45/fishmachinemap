'use client'

import { FC, memo, useEffect, useState } from 'react'
import { useLogicExperience } from './logic'
import { Experiences } from './type'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FilterExperiencias from '@/components/FilterExperiencias'
import MultiActionAreaCard from '@/components/CardExperiences'
import FloatAddExperiences from '@/components/FloatAddExperiences'
import ExperienceModal from '@/components/ModalAddExperiences'
import CircularIndeterminate from '@/components/Loader'
import {
    CardContainer,
    Container,
    ContainerInFluencer,
    ContainerMenu,
    FilterContainer,
    MainContainer,
    TextNav,
    NoDataText,
} from './style'
import { Button, Typography } from '@mui/material'

const Experiencias: FC = () => {
    const { currentUser, getUserInfo, getExperiences, experiences, loading } =
        useLogicExperience()
    console.log('experiences', experiences)
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
            <ContainerMenu>
                <AccountMenu userPicture={currentUser?.picture} />
            </ContainerMenu>
            <Container>
                <TextNav>Experiencias. Inolvidables</TextNav>
            </Container>
            <FilterContainer>
                <FilterExperiencias
                    value={selectedCategory}
                    onChange={filterByCategory}
                />
            </FilterContainer>
            {!isInfluencer && (
                <ContainerInFluencer>
                    <Typography variant="body1">¿Eres Influencer?</Typography>
                    <Button
                        sx={{ color: '#49007a' }}
                        onClick={() => sendUsEmail()}
                    >
                        ¡Envíanos un email!
                    </Button>
                </ContainerInFluencer>
            )}
            <CardContainer
                style={{ marginTop: !isInfluencer ? '1rem' : '8rem' }}
            >
                {experiences.map((item: any) => {
                    return (
                        <MultiActionAreaCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            picture={item.picture}
                            category={item.category}
                            price={item.price}
                            city={item.city}
                            country={item.country}
                            whatsapp={item.whatsapp}
                        // onClick={() => {}}
                        />
                    )
                })}
            </CardContainer>
            <MainContainer>
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
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
