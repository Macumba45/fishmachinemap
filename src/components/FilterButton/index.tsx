import { IconButton } from '@mui/material'
import { FC, useState, memo, useEffect } from 'react'
import { ButtonContainer } from './styles'
import FilterComponent from '../FilterComponet'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { MarkerType } from '@/app/[locale]/maps/type'

interface FilterButtonProps {
    onChange: (newFilter: MarkerType) => void
}

const FilterButton: FC<FilterButtonProps> = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<MarkerType>(
        MarkerType.ALL
    )

    const toggleFilters = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleFilterChange = (newFilter: MarkerType) => {
        setSelectedFilter(newFilter) // Actualiza el estado con el nuevo filtro seleccionado
        onChange(newFilter) // Llama a la función `onChange` pasando el nuevo filtro
    }

    // Aplicar el filtro inicialmente cuando se carga el componente
    useEffect(() => {
        onChange(selectedFilter)
    }, []) // [] significa que se ejecuta solo una vez al cargar el componente

    return (
        <ButtonContainer className="filterButton">
            <IconButton onClick={toggleFilters}>
                <FilterAltIcon sx={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>
            {isOpen && (
                <FilterComponent
                    onChange={handleFilterChange}
                    selectedFilter={selectedFilter}
                    open={isOpen}
                    onClose={handleClose}
                />
            )}
        </ButtonContainer>
    )
}

export default memo(FilterButton)
