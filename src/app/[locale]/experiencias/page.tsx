'use client'

import React, { FC, memo } from 'react'
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

const Experiencias: FC = () => {
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
                <AccountMenu />
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
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Experiencias)
