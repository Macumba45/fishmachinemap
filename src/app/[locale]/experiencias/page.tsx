'use client'

import { FC, memo, useEffect, useState } from 'react'
import {
    CardContainer,
    Container,
    ContainerMenu,
    FilterContainer,
    MainContainer,
    TextNav,
} from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import AccountMenu from '@/components/Menu'
import FilterExperiencias from '@/components/FilterExperiencias'
import MultiActionAreaCard from '@/components/CardExperiences'
import { useLogicExperience } from './logic'
import FloatAddExperiences from '@/components/FloatAddExperiences'
import ExperienceModal from '@/components/ModalAddExperiences'
import { title } from 'process'

const Experiencias: FC = () => {
    const { currentUser, getUserInfo } = useLogicExperience()
    const [openModal, setOpenModal] = useState(false)
    const isInfluencer = currentUser?.role === 'INFLUENCER'
    console.log(isInfluencer)
    useEffect(() => {
        getUserInfo()
    }, [])

    // const [filteredData, setFilteredData] = useState<Store[]>(store)
    // const [selectedCategory, setSelectedCategory] = useState<string>('Todos') // Establecer el valor predeterminado como "Todos"
    // const filterByCategory = (selectedCategory: string) => {
    //     if (selectedCategory === 'Todos') {
    //         setSelectedCategory('Todos') // Update the selected category
    //         setFilteredData(store) // Si el valor seleccionado es "all", entonces mostrar todos los datos
    //         return
    //     }
    //     setSelectedCategory(selectedCategory) // Update the selected category
    //     const filteredData = store.filter(
    //         (item: any) => item.category === selectedCategory
    //     )
    //     setFilteredData(filteredData)
    // }
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
                // value={selectedCategory}
                // onChange={filterByCategory}
                />
            </FilterContainer>
            <CardContainer>
                <MultiActionAreaCard />
                <MultiActionAreaCard />
                <MultiActionAreaCard />
                <MultiActionAreaCard />
                <MultiActionAreaCard />
                <MultiActionAreaCard />
            </CardContainer>
            <MainContainer>
                {isInfluencer && (
                    <FloatAddExperiences
                        title="Añadir Experiencia"
                        onClick={() => setOpenModal(true)}
                    />
                )}
                <ExperienceModal
                    experience={{
                        title: '',
                        category: '',
                        description: '',
                        price: '',
                        phone: '',
                        url: '',
                        role: '',
                    }}
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
