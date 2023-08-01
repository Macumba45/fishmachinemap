import { IconButton } from '@mui/material'
import { FC, useState, memo } from 'react'
import { ButtonContainer } from './styles'
import FilterComponent from '../FilterComponet'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { MarkerType } from '@/app/maps/type'

interface FilterButtonProps {
    onChange: (newFilter: MarkerType) => void
}

const FilterButton: FC<FilterButtonProps> = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleFilters = () => {
        setIsOpen(prevOpen => !prevOpen)
    }

    const handleFilterChange = (newFilter: MarkerType) => {
        onChange(newFilter) // Llama a la función `onChange` pasando el nuevo filtro
    }

    return (
        <ButtonContainer>
            <IconButton onClick={toggleFilters}>
                <FilterAltIcon sx={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>
            {isOpen && <FilterComponent onChange={handleFilterChange} />}
        </ButtonContainer>
    )
}

export default memo(FilterButton)
