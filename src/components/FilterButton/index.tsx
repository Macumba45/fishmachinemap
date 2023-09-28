import { IconButton } from '@mui/material'
import { FC, useState, memo, useEffect, useCallback } from 'react'
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

    const handleFilterChange = useCallback(
        (newFilter: MarkerType) => {
            setSelectedFilter(newFilter)
            onChange(newFilter)
        },
        [onChange]
    )

    // Aplicar el filtro inicialmente cuando se carga el componente
    useEffect(() => {
        onChange(selectedFilter)
    }, [selectedFilter]) // [] significa que se ejecuta solo una vez al cargar el componente

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
