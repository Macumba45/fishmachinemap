import { IconButton } from '@mui/material'
import { FC, useState, memo } from 'react'
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
        setIsOpen(prevOpen => !prevOpen)
    }

    const handleFilterChange = (newFilter: MarkerType) => {
        setSelectedFilter(newFilter) // Actualiza el estado con el nuevo filtro seleccionado
        onChange(newFilter) // Llama a la función `onChange` pasando el nuevo filtro
    }

    return (
        <ButtonContainer>
            <IconButton onClick={toggleFilters}>
                <FilterAltIcon sx={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>
            {isOpen && (
                <FilterComponent
                    onChange={handleFilterChange}
                    selectedFilter={selectedFilter}
                />
            )}
        </ButtonContainer>
    )
}

export default memo(FilterButton)
