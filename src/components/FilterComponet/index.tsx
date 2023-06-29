// FilterComponent
import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const FilterComponent = ({ onChange }: any) => {
    // Añadir el estado local para el filtro
    const [filter, setFilter] = useState('all')

    // Añadir la función handleFilterChange

    const handleFilterChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: string
    ) => {
        setFilter(newFilter)
        onChange(newFilter) // Invocar la función onChange para propagar el cambio al componente padre
    }

    // Añadir el componente ToggleButtonGroup

    return (
        <div
            style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'white',
            }}
        >
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
            >
                <ToggleButton value="all">Todo</ToggleButton>
                <ToggleButton value="shop">Tiendas</ToggleButton>
                <ToggleButton value="worm">Cebos Vivos 24h</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default FilterComponent
