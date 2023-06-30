import { Button } from '@mui/material'
import { FC, useState } from 'react'
import { ButtonContainer } from './styles'
import FilterComponent from '../FilterComponet'

const FilterButton: FC = () => {
    const buttonStyle = {
        backgroundColor: '#F2F2F2',
        color: '#000000',
        marginBottom: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        border: 'none',
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggleFilters = () => {
        setIsOpen(prevOpen => !prevOpen)
    }

    const handleFilterChange = (newFilter: string) => {
        // Aquí puedes realizar acciones adicionales cuando cambia el filtro
        console.log('Nuevo filtro:', newFilter)
    }

    return (
        <ButtonContainer>
            <Button style={buttonStyle} onClick={toggleFilters}>
                {isOpen ? 'Cerrar filtros' : 'Abrir filtros'}
            </Button>
            {isOpen && <FilterComponent onChange={handleFilterChange} />}
        </ButtonContainer>
    )
}

export default FilterButton
